import { configureStore } from "@reduxjs/toolkit";
import todoReducers from '../features/todoSlice'

export const store = configureStore({
    reducer: {
        todos: todoReducers
    }
})