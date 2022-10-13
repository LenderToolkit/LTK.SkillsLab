// node_modules
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo(state, action) {
      state.todos = [...state.todos, action.payload.todo];
    },
    removeTodo(state, action) {
      state.todos = [...state.todos.slice(0, action.payload.index), ...state.todos.slice(action.payload.index + 1)]
    }
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;
