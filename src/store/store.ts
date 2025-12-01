import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/user";
import studentReducer from "./slices/studentList"

export const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;