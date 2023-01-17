import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBook,
  faBookOpen,
  faBrain,
  faCheckSquare,
  faFilm,
  faGlobe,
  faHeart,
  faListAlt,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toggleDisplay } from "../features/reducerSlices/addTodoSlice";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  checkAllTodo,
  clearTodo,
  toggleTodo,
} from "../features/reducerSlices/todosSlice";
import { check } from "../loaders";
import AddTodo from "./AddTodo";
import { Link } from "react-router-dom";
import { getTodoIndexById } from "../todoApp";
import { changeCategory } from "../features/reducerSlices/categorySlice";
//-----------------------------------
function Todos() {
  const todosContainerRef = useRef(null);
  const [checkloading, setcheckLoading] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todo.todos);

  const todoCheckHandler = async (e, id) => {
    const index = getTodoIndexById(todos, id);
    setcheckLoading(true);
    try {
      let data = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          check: !todos[index].check,
        }),
      });
      if (data.ok) {
        dispatch(toggleTodo({ id: id }));
        setcheckLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const delHandler = async (e, id) => {
    e.currentTarget.setAttribute("disabled", "");
    const del = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!del.ok) {
      e.currentTarget.removeAttribute("disabled");
    } else {
      dispatch(clearTodo({ id: id }));
    }
  };
  const addTodoDisplayFlag = useSelector(
    (state) => state.addTodoDisplay.display
  );

  const category = useSelector((store) => store.category.category);
  //--------------------------
  return (
    <div className="todosOuterContainer">
      <div className="sideBar">
        <div
          tooltip="New Todo"
          tooltip-position="right"
          className="sideBar-button"
          onClick={() => {
            dispatch(toggleDisplay());
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>

        <div
          className="sideBar-button"
          tooltip="All Todo"
          tooltip-position="right"
          onClick={() => {
            dispatch(changeCategory("all"));
          }}
        >
          <FontAwesomeIcon icon={faListAlt} />
        </div>
        <div
          className="sideBar-button"
          tooltip="Daily Routine"
          tooltip-position="right"
          onClick={() => {
            dispatch(changeCategory("dailyRoutine"));
          }}
        >
          <FontAwesomeIcon icon={faBath} />
        </div>
        <div
          className="sideBar-button"
          tooltip="Work"
          tooltip-position="right"
          onClick={() => {
            dispatch(changeCategory("work"));
          }}
        >
          <FontAwesomeIcon icon={faGlobe} />
        </div>
        <div
          className="sideBar-button"
          tooltip="Entertainment"
          tooltip-position="right"
          onClick={() => {
            dispatch(changeCategory("entertainment"));
          }}
        >
          <FontAwesomeIcon icon={faFilm} />
        </div>
        <div
          className="sideBar-button"
          tooltip="Health"
          tooltip-position="right"
          onClick={() => {
            dispatch(changeCategory("health"));
          }}
        >
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div
          className="sideBar-button"
          tooltip="Learning"
          tooltip-position="right"
          onClick={() => {
            dispatch(changeCategory("learning"));
          }}
        >
          <FontAwesomeIcon icon={faBook} />
        </div>
        <div
          className="sideBar-button"
          tooltip="others"
          tooltip-position="right"
          onClick={() => {
            dispatch(changeCategory("others"));
          }}
        >
          <FontAwesomeIcon icon={faTasks} />
        </div>
      </div>
      <div ref={todosContainerRef} className="todosContainer">
        {addTodoDisplayFlag ? (
          <AddTodo />
        ) : (
          <Container>
            <>{checkloading ? "loading..." : "todo"}</>
            <ul className="todosContainer-ul">
              {todos
                .slice(0)
                .reverse()
                .map((todo) =>
                  category === "all" || category === todo.category ? (
                    <li key={todo.id} id={todo.id}>
                      <input
                        type={"checkbox"}
                        id={`check-${todo.id}`}
                        defaultChecked={todo.check}
                      />
                      <div className="todoCard">
                        <Link
                          to={`/home/IndividualTodo/${todo.id}`}
                          className="todoCardLink"
                        >
                          <div className="todoTitle">{todo.title}</div>
                          <div className="todoDescription">
                            {todo.description}
                          </div>
                        </Link>
                      </div>
                      <div className="todoCardFooter">
                        <span
                          className="deleteButton"
                          onClick={(e) => {
                            e.stopPropagation();
                            delHandler(e, todo.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} className="icon" />
                        </span>
                        <span className="Square">
                          <label
                            htmlFor={`check-${todo.id}`}
                            className="list-lable"
                            onClick={(e) => {
                              todoCheckHandler(e, todo.id);
                            }}
                          >
                            {todo.check ? (
                              <FontAwesomeIcon
                                icon={faCheckSquare}
                                className="icon"
                              ></FontAwesomeIcon>
                            ) : (
                              <FontAwesomeIcon
                                icon={faSquare}
                                className="icon"
                              />
                            )}
                          </label>
                        </span>
                      </div>
                    </li>
                  ) : (
                    ""
                  )
                )}
            </ul>
          </Container>
        )}
      </div>
    </div>
  );
}

export default Todos;
