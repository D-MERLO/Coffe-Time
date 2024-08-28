import {configureStore} from "@reduxjs/toolkit";
import { userSlice } from "./reducer";

const store = configureStore({
    reducer: userSlice.reducer
})

export default store;


