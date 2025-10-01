import { useAppDispatch } from "@/app/store/store"
import { Status, UsersRequest } from "@/shared"
import { login, logout, currentUser, enterObject } from "../model/auth-actions"
import { clearCurrentObject, ICurrentVerification, setCurrentVerification, setUserActivate } from "../model/auth-slice";
import { useState } from "react";
import { IObject } from "@/shared/types/object";

export const useLoginAuth = () => {
  const dispatch = useAppDispatch()

  const loginUser = (form: UsersRequest) => {
    dispatch(login(form))
  };

  return { loginUser };
};
  
export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  
  const getCurrentUser = () => dispatch(currentUser())
  

  return { getCurrentUser };
}

export const useLogoutUser = () => {
  const dispatch = useAppDispatch()
  
  const logoutUser = () => {
    dispatch(logout())
  };

  return { logoutUser };
}

export const useSetUserActive = () => {
  const dispatch = useAppDispatch()
  
  const activateUser = (objectId: string, name: string, access_expires_at: string, falsification?: boolean) => {
    dispatch(setUserActivate({objectId, access_expires_at,name, falsification}))
  };

  return activateUser
}

export const useEnterObject = () => {
  const dispatch = useAppDispatch();

  const [currentObject, setCurrentObjectId] = useState<IObject | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const activateUser = async (object: IObject) => {
    setCurrentObjectId(object);
    setStatus('loading');
    setError(null);

    try {
      await dispatch(enterObject({ objectId: object.id })).unwrap();
      setStatus("received");
    } catch (err) {
      console.log(err)
      setError(typeof err === 'string' ? err : 'Unknown error');
      setStatus("rejected");
    }
  };

  return {
    activateUser,
    currentObject,
    status,
    error,
  };
};

export const useClearCurrentObject = () => {
  const dispatch = useAppDispatch()

  const clear = () => dispatch(clearCurrentObject())

  return clear
}

export const useSetCurrentVerification = () => {
  const dispatch = useAppDispatch()
  
  const change = (obj: ICurrentVerification) => dispatch(setCurrentVerification(obj))

  return change
}