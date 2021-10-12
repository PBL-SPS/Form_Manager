import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
// ...
const store = configureStore({
    reducer: combineReducers({
        auth: authSlice,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
