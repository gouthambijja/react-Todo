import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { getNoofchecked } from "../todoApp";
import Time from "./Time";

function NavUtils() {
  const todo = useSelector((store) => store.todo.todos);
  const done = getNoofchecked(todo);
  return (
    <div className="navbar-utils">
      <div className="navbar-util time">
        <Time />
      </div>
      <div className="navbar-util">Todo({todo.length - done})</div>
      <div className="navbar-util">Done({done})</div>
      <div
        className="navbar-util sign-out"
        onClick={() => {
          window.localStorage.setItem("userId", null);
          window.location.href = "http://localhost:3000";
        }}
      >
        <FontAwesomeIcon icon={faSignOut} />
      </div>
    </div>
  );
}

export default NavUtils;
