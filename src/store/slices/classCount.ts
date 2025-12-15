import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClassCountItem {
    id: string;
    name: string;
    day: string;
    time: string;
}

interface ClassCountState {
    list: ClassCountItem[];
}

const initialState: ClassCountState = {
    list: [],
};

export const classCountSlice = createSlice({
    name: "classCount",
    initialState,
    reducers: {
        setClassCount(state, action: PayloadAction<ClassCountItem[]>) {
            state.list = action.payload;
        },
        updateClassDay(
            state,
            action: PayloadAction<{ id: string; day: string }>
        ) {
            const item = state.list.find(i => i.id === action.payload.id);
            if (item) {
                item.day = action.payload.day;
            }
        },
        addClass(state, action: PayloadAction<ClassCountItem>) {
            state.list.push(action.payload);
        },
    },
});

export const {
    setClassCount,
    updateClassDay,
    addClass,
} = classCountSlice.actions;

export default classCountSlice.reducer;
