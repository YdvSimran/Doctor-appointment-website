import { configureStore } from "@reduxjs/toolkit";
import { alertSLice } from "./features/alertSlice";
import { userSlice } from "./features/userSlice";

export default configureStore({
               reducer:{
                              alerts:alertSLice.reducer,
                              user:userSlice.reducer,
               },
})