import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./public/chatsSlice"; // Import the default export

export const store = configureStore({
  reducer: {
    chats: chatsReducer, // Use the reducer directly
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable this middleware
    }),
});
