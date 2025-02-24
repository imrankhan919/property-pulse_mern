import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import message from "./message/messageSlice";
import property from "./property/propertySlice";

const store = configureStore({
  reducer: {
    auth,
    message,
    property,
  },
});

export default store;
