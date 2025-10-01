import axios from "axios";
import { endpoints } from "./endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dev = {
  API_URL: "http://192.168.0.8:8000/api"
};

const prod = {
  API_URL: "https://api.constructioncms.ru/api",
};

// Проверка окружения
const ENV = __DEV__ ? dev : prod;

export const API_URL = ENV.API_URL;
export const VERSION = "/v1"

export const api = axios.create({
  baseURL: API_URL+VERSION,
});

async function saveCookies(cookies: string | string[]) {
  
  const cookieString = Array.isArray(cookies) ? cookies.join("; ") : cookies;
  await AsyncStorage.setItem("cookies", cookieString);
}

async function getCookies(): Promise<string | null> {
  const cookies = await AsyncStorage.getItem("cookies");
  return cookies;
}

function getRefreshToken(cookies: string) {
  const match = cookies?.match(/refresh_token=([0-9a-fA-F-]+)/);
  // match[1] — это только UUID без "refresh_token="
  return match ? match[1] : null;
}

api.interceptors.request.use(async (config) => {
  const cookieHeader = await getCookies();
  if (cookieHeader) {
    config.headers.Cookie = cookieHeader;
  }
  return config;
});

api.interceptors.response.use(
  async (response) => {
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      await saveCookies(setCookieHeader);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest.url.includes(endpoints.users.refresh) &&
      !originalRequest.url.includes(endpoints.users.login) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      try {
        const cookieHeader = await getCookies();
        const refreshToken =  getRefreshToken(cookieHeader? cookieHeader: "");
        
        if (cookieHeader){
          originalRequest.headers.Cookie = refreshToken+";";
        }
        
        await axios.post(API_URL + VERSION +
          endpoints.users.refresh,
        );

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError + "refreshError");
      }
    }

    return Promise.reject(error);
  }
);