import { useAppDispatch } from "@/app/store/store"
import { Status } from "@/shared"
import { setStatusAuth } from "../model/auth-slice"

export const useSetStatus = () => {
  const dispatch = useAppDispatch()

  const setStatusUser = (status: Status) => dispatch(setStatusAuth(status))

  return {setStatusUser}
}