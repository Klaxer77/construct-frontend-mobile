import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authStackSlice from '@/features/auth/model/auth-slice';
import listObjectsSlice from '@/features/listObjects/model/list-object-model';
import { endpoints } from '@/shared/config/endpoints';
import { api } from '@/shared/config/api';

// Конфигурация persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [''],
  blacklist: ['auth', "objects"],
};

const rootReducer = combineReducers({
  auth: authStackSlice,
  objects: listObjectsSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: api,
          endpoints,
        },
      },
      serializableCheck:  {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});


export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()