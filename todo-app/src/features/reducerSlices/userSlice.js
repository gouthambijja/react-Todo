import { createSlice } from "@reduxjs/toolkit";

const user = {
  userId: 0,
};

const reducers = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    logInUser(state, action) {
      state.userId = action.payload;
    },
  },
});
const { actions, reducer } = reducers;
const { logInUser } = actions;
export default reducer;
export { logInUser };
