import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all",
};
const categoryReducer = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    changeCategory(state, action) {
      state.category = action.payload;
    },
  },
});

const { actions, reducer } = categoryReducer;
const { changeCategory } = actions;
export { changeCategory };
export default reducer;
