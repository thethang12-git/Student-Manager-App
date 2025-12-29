import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { id: string } = {
    id: "",
};

export const studentDetailSlice = createSlice({
    name: "studentDetail",
    initialState,
    reducers: {
        setStudentDetail: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
    },
});

export const { setStudentDetail } = studentDetailSlice.actions;
export default studentDetailSlice.reducer;