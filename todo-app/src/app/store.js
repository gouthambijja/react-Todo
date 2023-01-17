import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/reducerSlices/todosSlice";
import userReducer from "../features/reducerSlices/userSlice";
import addTodoDisplay from "../features/reducerSlices/addTodoSlice";
import categoryReducer from "../features/reducerSlices/categorySlice";
let store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    addTodoDisplay: addTodoDisplay,
    category: categoryReducer,
  },
});

export default store;
