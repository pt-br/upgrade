import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { upgradeApi } from '@/apis/upgradeApi';

export const store = configureStore({
  reducer: {
    [upgradeApi.reducerPath]: upgradeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(upgradeApi.middleware),
});

setupListeners(store.dispatch);
