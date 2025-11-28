import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Student {
    id: string;
    name: string;
    age: number;
    class: string;
}
interface StudentListState {
    list: Student[];
}
const initialState: StudentListState = {
    list : []
};

export const studentsSlice = createSlice({
    name: "studentList",
    initialState,
    reducers: {
        setList: (state, action: PayloadAction<Student[]>) => {
            state.list = action.payload;
        },
        deleteStudent: (state, action: PayloadAction<any>) => {
            state.list = state.list.filter((item) => item.id !== action.payload);
        },
        addStudent: (state, action: PayloadAction<Student>) => {
          state.list.push(action.payload);
        }
    },
});

export const { setList,deleteStudent,addStudent } = studentsSlice.actions;
export default studentsSlice.reducer;