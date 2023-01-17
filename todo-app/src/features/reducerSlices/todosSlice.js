import { createSlice } from "@reduxjs/toolkit";
import { getTodoIndexById, getAllCheckedindex } from "../../todoApp";
const initialState = {
  todos: [],
};

const reducerSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    initializeStoreAction(state, action) {
      state.todos = action.payload;
    },
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    clearTodo(state, action) {
      const index = getTodoIndexById(state.todos, action.payload.id);
      state.todos.splice(index, 1);
    },
    toggleTodo(state, action) {
      const index = getTodoIndexById(state.todos, action.payload.id);
      state.todos[index].check = !state.todos[index].check;
    },
    checkAllTodo(state, action) {
      for (let i = 0; i < state.todos.length; i++) {
        state.todos[i].check = true;
      }
    },
    unCheckAllTodo(state, action) {
      for (let i = 0; i < state.todos.length; i++) state.todos[i].check = false;
    },
    clearAllCheckedTodo(state, action) {
      const CheckedIndexArr = getAllCheckedindex(state.todos);
      for (let i = 0; i < CheckedIndexArr.length; i++)
        state.todos.splice(CheckedIndexArr[i], 1);
    },
    clearAlltodo(state, action) {
      state.todos = [];
    },
    editTodo(state, action) {
      state.todos[action.payload.id] = action.payload.editedContent;
    },
  },
});

const { actions, reducer } = reducerSlice;
const {
  editTodo,
  initializeStoreAction,
  toggleTodo,
  unCheckAllTodo,
  addTodo,
  checkAllTodo,
  clearAllCheckedTodo,
  clearAlltodo,
  clearTodo,
} = actions;
export {
  editTodo,
  initializeStoreAction,
  toggleTodo,
  unCheckAllTodo,
  addTodo,
  checkAllTodo,
  clearAllCheckedTodo,
  clearAlltodo,
  clearTodo,
};
export default reducer;
