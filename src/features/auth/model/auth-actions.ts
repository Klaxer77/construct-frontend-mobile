import { ApiResponse, IUser, UsersRequest } from "@/shared";
import { api } from "@/shared/config/api";
import { endpoints } from "@/shared/config/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICompany } from "./auth-slice";
import { IFullObject } from "@/shared/types/object";

export const login = createAsyncThunk<
  {user: IUser, company: ICompany},
  UsersRequest,
  { rejectValue: string }
>
(
  "@@auth/login",
  async (request, { rejectWithValue }) => {
    try {
      
      const result = await api.post<ApiResponse<IUser>>(endpoints.users.login, request)
      const company = await api.get<ApiResponse<ICompany>>(endpoints.company.current)
      
      return {user: result.data.data, company: company.data.data}
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown error');
    }
  }
);

export const logout = createAsyncThunk<
  ApiResponse<{ result: string }>, 
  undefined,                           
  { rejectValue: string }
>(
  "@@auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.post<ApiResponse<{ result: string }>>(endpoints.users.logout);
      return result.data;
    } catch (error) {
      console.log(error)
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

export const currentUser = createAsyncThunk<
  [IUser, ICompany | null],
  undefined,
  { rejectValue: string }
>
(
  "@@auth/current",
  async (_, { rejectWithValue }) => {
    try {
      const [result, company] = await Promise.allSettled([
        api.get<ApiResponse<IUser>>(endpoints.users.current),
        api.get<ApiResponse<ICompany>>(endpoints.company.current),
        new Promise<void>((resolve) => setTimeout(() => resolve(undefined), 1000))
      ]);
      if (result.status === "fulfilled") {
        return [result.value.data.data, company.status === "fulfilled" ? company.value.data.data: null]
      } else {
        throw new Error("Failed to fetch current user");
      }
    } catch (error) {
      console.log(error)
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown error');
    }
  }
);


export const nfcVerification = createAsyncThunk<
undefined,
{nfc_uid: string, objectId: string},
  { rejectValue: string }
>
(
  "@@auth/verification",
  async ({objectId, nfc_uid}, { rejectWithValue }) => {
    try {
      await api.post(endpoints.nfc.add(objectId), {
        nfc_uid: nfc_uid
      })
      
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown error');
    }
  }
);

export const enterObject = createAsyncThunk<
IFullObject,
{objectId: string},
  { rejectValue: string }
>
(
  "@@auth/enterObject",
  async ({objectId}, { rejectWithValue }) => {
    try {
      const result = await api.get<ApiResponse<IFullObject>>(endpoints.objects.get(objectId))
      return result.data.data
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown error');
    }
  }
);