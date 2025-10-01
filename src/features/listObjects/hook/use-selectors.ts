import { useAppSelector } from "@/app/store/store";

export const useListObjects = () => useAppSelector((state) => state.objects.litsObject)
export const useStatusListObjects = () => useAppSelector((state) => state.objects.status)
export const useStatusCheckList = () => useAppSelector((state) => state.objects.statusCheckList)
export const useStatusChangeAct = () => useAppSelector((state) => state.objects.statusChangeAct)
export const useErrorListObjects = () => useAppSelector((state) => state.objects.error)
export const useGetActionChangeAct = () => useAppSelector((state) => state.objects.actionChangeAct)