import { useAppDispatch, useAppSelector } from "@/app/store/store"
import { activateCheckList, changeActStatus, getAllObjects, sendFileActivate } from "../model/list-object-actions"
import { addFileToObject, clearStatusObjects, editNfcIs, IExtendedObject, removeFileFromObject } from "../model/list-object-model"
import { ICheckListRequest } from "@/shared/types/object"
import { Asset } from "react-native-image-picker"

export const useGetObjects = (): [
  objects: IExtendedObject[]|null,
  getAll: (companyId: string) => void,
] => {
  const dispatch = useAppDispatch()
  const objects = useAppSelector((state) => state.objects.litsObject)

  const getAll = (companyId: string) => dispatch(getAllObjects(companyId))

  return [objects, getAll]
}

export const useActivateCheckList = () => {
  const dispatch = useAppDispatch()
  
  const activate = (request: {checkList: ICheckListRequest, objectId: string}) => dispatch(activateCheckList(request))

  return activate
}

export const useChangeActStatus = () => {
  const dispatch = useAppDispatch();
  
  const changeAct = (request: {objectId: string, action: "accept" | "deny"}) => dispatch(changeActStatus(request))

  return changeAct
}

export const useSendFileActivate = () => {
  const dispatch = useAppDispatch();

  const sendFile = (request: {objectId: string, updload_file: Asset}) => dispatch(sendFileActivate(request))

  return sendFile
}

export const useAddFileToObject = () => {
  const dispatch = useAppDispatch();
  
  const addFile = (payload: {
      objectId: string;
      file: Asset;
  }) => dispatch(addFileToObject(payload))

  return addFile
}

export const useRemoveFile = () => {
  const dispatch = useAppDispatch();

  const removeFile = (payload: string) => {
    dispatch(removeFileFromObject(payload))
  }

  return removeFile
}

export const useClearStatus = () => {
  const dispatch = useAppDispatch();

  const clear = () => {
    dispatch(clearStatusObjects())
  }

  return clear
}

export const useEditNfcIsObject = () => {
  const dispatch = useAppDispatch();
  
  const edit = (objectId: string, isNfc: boolean) => {
    dispatch(editNfcIs({objectId: objectId, isNfc: isNfc}))
  }

  return edit
}