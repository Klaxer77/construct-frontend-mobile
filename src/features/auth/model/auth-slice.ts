import { IObjectAccess, IUser, Status } from '@/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentUser, enterObject, login, logout } from './auth-actions';
import { IFullObject } from '@/shared/types/object';
export interface ICompany {
  title: string,
  id: string,
}

export interface ICurrentVerification extends IObjectAccess {
  name?: string
}

interface AuthState {
  user: IUser | null,
  company: ICompany | null,
  status: Status,
  currentObject: IFullObject | null,
  currentVerification: ICurrentVerification | null,
  statusVerification: Status,
  statusLogout: Status
  error: string | null,
}

const initialState: AuthState = {
  user: null,
  company: null,
  status: "idle",
  statusLogout: "idle",
  statusVerification: "idle",
  currentObject: null,
  error: "",
  currentVerification: null,
};

const authStackSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearCurrentObject: (state) => {
      state.currentObject = null
    },
    setStatusAuth: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setCurrentVerification: (state, action: PayloadAction<ICurrentVerification | null>) => {
      state.currentVerification = action.payload
    },
    setUserActivate: (state, action: PayloadAction<{access_expires_at: string, objectId: string,name:string, falsification?: boolean}>) => {
      if (state.user) {
      let obj = state.user.object_access?.find(
        (o) => o.object_id === action.payload.objectId
      );

      if (obj) {
        if (action.payload.falsification) {
          obj.access_expires_at = "";
          obj.is_active = false;

          state.currentVerification = null;
        } else {
          state.currentVerification = {
            object_id: obj.object_id,
            access_expires_at: action.payload.access_expires_at,
            is_active: true,
            name: action.payload.name,
                };
                obj.access_expires_at = action.payload.access_expires_at;
                obj.is_active = true;
              }
            } else {
              const newObj = {
                object_id: action.payload.objectId,
                access_expires_at: action.payload.falsification ? "" : action.payload.access_expires_at,
                is_active: !action.payload.falsification,
                name: action.payload.name,
              };

              state.user.object_access = [...(state.user.object_access || []), newObj];

              state.currentVerification = action.payload.falsification
                ? null
                : {
                    object_id: newObj.object_id,
                    access_expires_at: newObj.access_expires_at,
                    is_active: true,
                    name: newObj.name,
                  };
            }
          }
        },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.status = "received";
      state.statusLogout = "idle"
      state.user = action.payload.user;
      state.company = action.payload.company;
    })
    .addCase(login.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message || "Login failed";
    })
    .addCase(logout.pending, (state) => {
      state.statusLogout = "loading";
      state.error = null;
    })
    .addCase(logout.fulfilled, (state) => {
      state.statusLogout = "received";
      state.user = null;
      state.currentObject = null;
      state.currentVerification = null;
      state.status = "idle";
    })
    .addCase(logout.rejected, (state, action) => {
      state.statusLogout = "rejected";
      state.error = action.error.message || "Logout failed";
    })
    .addCase(currentUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(currentUser.fulfilled, (state, action) => {
      state.status = "received";
      state.user = action.payload[0];
      state.company = action.payload[1];
    })
    .addCase(currentUser.rejected, (state, action) => {
      console.log(action.error.message, "отклонен")
      state.status = "rejected";
      state.error = action.error.message || "Failed to load current user";
    })
    .addCase(enterObject.fulfilled, (state, action) => {
      state.currentObject = action.payload
    })
  },
});

export const { setStatusAuth, setUserActivate, clearCurrentObject, setCurrentVerification } = authStackSlice.actions;
export default authStackSlice.reducer;