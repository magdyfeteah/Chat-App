import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import userSlice from "./userSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat : chatSlice.reducer,
    ui : uiSlice.reducer,
  },
});

export default store;
