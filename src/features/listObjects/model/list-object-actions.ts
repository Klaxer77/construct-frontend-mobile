import { ApiResponse } from "@/shared";
import { api } from "@/shared/config/api";
import { endpoints } from "@/shared/config/endpoints";
import { ICheckListRequest, IObject } from "@/shared/types/object";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Asset } from "react-native-image-picker";

export const getAllObjects = createAsyncThunk<
  IObject[],
  string,
  { rejectValue: string }
>
(
  "@@objects/getAll",
  async (companyId, { rejectWithValue }) => {
    try {
      const result = await api.get<ApiResponse<IObject[]>>(endpoints.objects.filterAll(companyId))
      
      return result.data.data
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown error');
    }
  }
);

export const activateCheckList = createAsyncThunk<
  string,
  {checkList: ICheckListRequest, objectId: string},
  { rejectValue: string }
>
(
  "@@objects/activateCheckList",
  async ({checkList, objectId}, { rejectWithValue }) => {
    try {
      await api.post<ApiResponse<IObject[]>>(endpoints.objects.activateCheckList(objectId), checkList)
      return objectId
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown error');
    }
  }
);

export const changeActStatus = createAsyncThunk<
  {objectId: string, action: "accept" | "deny"},
  {objectId: string, action: "accept" | "deny"},
  { rejectValue: string }
>
(
  "@@objects/changeActStatus",
  async ({action, objectId}, { rejectWithValue }) => {
    try {
      await api.post<ApiResponse<IObject[]>>(endpoints.objects.actChange(objectId, action))
      return {objectId, action}
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown error');
    }
  }
);

export const sendFileActivate = createAsyncThunk<
  string,
  {objectId: string, updload_file: Asset},
  { rejectValue: string }
>
(
  "@@objects/sendFileActivate",
  async ({updload_file, objectId}, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("upload_file", { // <- исправлено
        uri: updload_file.uri,
        type: updload_file.type ?? "image/jpeg",
        name: updload_file.fileName ?? "upload.jpg",
      } as any);

      await api.post<ApiResponse<IObject[]>>(
        endpoints.objects.sendFileActivate(objectId),
        formData
        // headers можно не ставить, axios сам выставит
      );
      return objectId

    } catch (error) {
      console.log(error)
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown error');
    }
  }
);