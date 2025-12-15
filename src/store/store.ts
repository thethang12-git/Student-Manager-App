import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/user";
import studentReducer from "./slices/studentList"
import dateSliceReducer from "./slices/dateCountData"
import actionType from "@/store/slices/actionMenuType";
export const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        date: dateSliceReducer,
        actionType:actionType
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;