import { Status } from '@/shared';
import { IObject } from '@/shared/types/object';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { activateCheckList, changeActStatus, getAllObjects, sendFileActivate } from './list-object-actions';
import { Asset } from 'react-native-image-picker';

interface IListObjectState {
  status: Status,
  statusCheckList: Status,
  error: string | null,
  statusChangeAct: Status,
  litsObject: IExtendedObject[]|null,
  actionChangeAct: "accept" | "deny" | ""
}

export interface IExtendedObject extends IObject {
  file: Asset | null;
  loading: boolean;
  error: boolean,
}

const initialState: IListObjectState = {
  litsObject: null,
  status: "idle",
  statusChangeAct: "idle",
  statusCheckList: "idle",
  error: "",
  actionChangeAct: "",
};

const listObjectsSlice = createSlice({
  name: 'listObjects',
  initialState,
  reducers: {
    editNfcIs: (
      state,
      action: PayloadAction<{ objectId: string, isNfc: boolean }>
    ) =>{
      const obj = state.litsObject?.find((o) => o.id === action.payload.objectId);
      if (obj){
        obj.is_nfc = action.payload.isNfc
      }
    },
    addFileToObject: (
      state,
      action: PayloadAction<{ objectId: string; file: Asset }>
    ) => {
      const obj = state.litsObject?.find((o) => o.id === action.payload.objectId);
      if (obj) {
        obj.file = action.payload.file;
        obj.error = false;
      }
    },
    removeFileFromObject: (state, action: PayloadAction<string>) => {
      const obj = state.litsObject?.find((o) => o.id === action.payload);
      if (obj) {
        obj.file = null;
        obj.error = false;
      }
    },
    clearStatusObjects: (state) => {
      state.statusChangeAct = "idle"
      state.statusCheckList = "idle"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllObjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllObjects.fulfilled, (state, action) => {
        state.status = "received";
        state.litsObject = action.payload.map((item) => ({
          ...item,
          file: null,
          loading: false,
          error: false,
        }));
      })
      .addCase(getAllObjects.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(activateCheckList.pending, (state) => {
        state.statusCheckList = "loading";
        state.error = null;
      })
      .addCase(activateCheckList.fulfilled, (state, action) => {
        state.statusCheckList = "received";
        const obj = state.litsObject?.find((o) => o.id === action.payload);
        if (obj){
          obj.object_type = "agreement"
        }
      })
      .addCase(activateCheckList.rejected, (state, action) => {
        state.statusCheckList = "rejected";
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(changeActStatus.pending, (state) => {
        state.statusChangeAct = "loading";
        state.error = null;
      })
      .addCase(changeActStatus.fulfilled, (state, action) => {
        state.statusChangeAct = "received";
        state.actionChangeAct = action.payload.action
        const obj = state.litsObject?.find((o) => o.id === action.payload.objectId);
        if (obj){
          obj.object_type = "act_opening"
        }
      })
      .addCase(changeActStatus.rejected, (state, action) => {
        state.statusChangeAct = "rejected";
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(sendFileActivate.pending, (state, action) => {
        const { objectId } = action.meta.arg;
        const obj = state.litsObject?.find((o) => o.id === objectId);
        if (obj){
          obj.loading = true
          obj.error = false
        }
        
      })
      .addCase(sendFileActivate.fulfilled, (state, action) => {
        const obj = state.litsObject?.find((o) => o.id === action.payload);
        if (obj){
          obj.object_type = "active"
          obj.loading = false
        }
        
      })
      .addCase(sendFileActivate.rejected, (state, action) => {
        const { objectId } = action.meta.arg;
        console.log(action.error)
        const obj = state.litsObject?.find((o) => o.id === objectId);
        if (obj){
          obj.error = true
          obj.loading = false
        }
        
      });
  }
});

export const { addFileToObject, removeFileFromObject, clearStatusObjects, editNfcIs } = listObjectsSlice.actions;
export default listObjectsSlice.reducer;