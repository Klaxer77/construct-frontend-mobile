import { useAppSelector } from "@/app/store/store";

export const useUserAuth = () => useAppSelector((state) => state.auth.user);
export const useCompanyAuth = () => useAppSelector((state) => state.auth.company);
export const useStatusAuth = () => useAppSelector((state) => state.auth.status);
export const useErrorAuth = () => useAppSelector((state) => state.auth.error); 
export const useStatusAuthLogout = () => useAppSelector((state) => state.auth.statusLogout);
export const useGetCurrentObject = () => useAppSelector((state) => state.auth.currentObject)
export const useGetCurrentVerification = () => useAppSelector((state) => state.auth.currentVerification)