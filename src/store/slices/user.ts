import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userId: string;
    name: string;
    avatar?:string | null;
    role: string;
    studentId: string;
    email: string;
}

const initialState: UserState = {
    userId: "",
    name: "",
    avatar: "",
    role:"",
    studentId :"",
    email: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.userId = action.payload?.id ;
            state.name = action.payload?.name ;
            state.avatar = action.payload?.avatar;
            state.role = action.payload?.role;
            state.studentId = action.payload?.studentId;
            state.email = action.payload?.email;
        },
        resetUser: (state) => {
            state.userId = "";
            state.name = "";
            state.avatar = "";
            state.role = "";
            state.studentId = "";
            state.email = "";
        },
        setAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
        }
    },
});

export const { setUser,resetUser,setAvatar } = userSlice.actions;
export default userSlice.reducer;