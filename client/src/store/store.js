import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import uiReducer from "./slices/uiSlice";
import courseReducer from "./slices/courseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    ui: uiReducer,
    course: courseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
