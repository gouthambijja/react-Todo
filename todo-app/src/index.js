import React, { Children } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StoreLoader, { check, initializeStore } from "./loaders";
import "./index.css";
import Todos from "./components/Todos";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import actions, { homeAction } from "./actions";
import Home from "./components/home";
import store from "./app/store";
import Profile from "./components/profile";
import Error from "./components/error";

import "react-bootstrap/dist/react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import IndividualTodo from "./components/IndividualTodo";
import Welcome from "./components/Welcome";
import './css/animation.scss'

const container = document.getElementById("root");
const root = createRoot(container);


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<App />}
        action={actions}
        errorElement={<Error />}
      ></Route>
      <Route path="home" element={<Home />}>
        <Route index element={<Welcome />} loader={StoreLoader}></Route>
        <Route path="todos" element={<Todos />} loader={StoreLoader}></Route>
        <Route
          path="profile"
          element={<Profile />}
          loader={StoreLoader}
        ></Route>
        <Route
          path="individualTodo/:id"
          element={<IndividualTodo />}
          loader={StoreLoader}
        ></Route>
      </Route>
    </>
  )
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
