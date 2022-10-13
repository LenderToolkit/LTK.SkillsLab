import todoSlice, { todoActions } from "./todo.slice";

export const Slices = { todo: todoSlice.reducer };

export const Actions = {
  todo: todoActions,
};
