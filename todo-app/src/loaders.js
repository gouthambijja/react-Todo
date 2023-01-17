import { redirect } from "react-router-dom";
import { logInUser } from "./features/reducerSlices/userSlice";
import store from "./app/store";
import axios from "axios";
import { initializeStoreAction } from "./features/reducerSlices/todosSlice";

const StoreLoader = async ({ request }) => {
  if (store.getState().user.userId.id) return null;
  if (window.localStorage.getItem("userId") === "null") {
    return redirect("/");
  }
  const userId = window.localStorage.getItem("userId");
  let res = await fetch(`http://localhost:8080/users/?id=${userId}`);
  res = await res.json();
  if (res.length > 0) {
    store.dispatch(logInUser(res[0]));
    let data = await axios.get(`http://localhost:8080/todos?userId=${userId}`);
    store.dispatch(initializeStoreAction(data.data));
    return null;
  }
  return redirect("/");
};

export default StoreLoader;
