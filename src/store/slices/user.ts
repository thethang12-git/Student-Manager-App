import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    name: string;
    avatar?:string | null;
    role: string;
    studentId: string;
}

const initialState: UserState = {
    name: "",
    avatar: "",
    role:"",
    studentId :""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload?.name ;
            state.avatar = action.payload?.avatar;
            state.role = action.payload?.role;
            state.studentId = action.payload?.studentId;
        },
        resetUser: (state) => {
            state.name = "";
            state.avatar = "";
            state.role = "";
            state.studentId = "";
        },
        setAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
        }
    },
});

export const { setUser,resetUser,setAvatar } = userSlice.actions;
export default userSlice.reducer;