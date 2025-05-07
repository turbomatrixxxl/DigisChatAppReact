import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./public/chatsSlice";

export const store = configureStore({
  reducer: {
    chats: chatsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
