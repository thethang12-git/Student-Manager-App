import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { value: string } = {
    value: "",
};

export const actionType = createSlice({
    name: "actionType",
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setValue } = actionType.actions;
export default actionType.reducer;
