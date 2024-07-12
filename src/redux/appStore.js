import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";
import equipmentSlice from "./slices/equipmentSlice";


const appStore = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        equipments: equipmentSlice
    }
});

export default appStore;