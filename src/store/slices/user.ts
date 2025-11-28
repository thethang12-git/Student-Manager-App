import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    name: string;
    avatar?:string | null;
    role: string;
}

const initialState: UserState = {
    name: "",
    avatar: "",
    role:""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload?.name ;
            state.avatar = action.payload?.avatar;
            state.role = action.payload?.role;
        },
        resetUser: (state) => {
            state.name = "";
            state.avatar = "";
            state.role = "";
        },
        setAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
        },
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        }
    },
});

export const { setUser,resetUser,setAvatar,setRole } = userSlice.actions;
export default userSlice.reducer;