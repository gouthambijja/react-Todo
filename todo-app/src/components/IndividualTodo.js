import {
  faCheckSquare,
  faEdit,
  faPlus,
  faSave,
  faSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toggleDisplay } from "../features/reducerSlices/addTodoSlice";
import {
  clearTodo,
  editTodo,
  toggleTodo,
} from "../features/reducerSlices/todosSlice";
import { getTodoIndexById } from "../todoApp";

function IndividualTodo() {
  const [present, setPresent] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const DescriptionRef = useRef(null);
  const todos = useSelector((store) => store.todo.todos);
  const [editState, setEditState] = useState(false);
  const index = getTodoIndexById(todos, id);
  useEffect(() => {
    if (index === -1) {
      setPresent(false);
    } else {
      setPresent(true);
    }
  }, []);
  const editHandler = async () => {
    setEditState(!editState);
    if (!editState) {
      titleRef.current.contentEditable = true;
      DescriptionRef.current.contentEditable = true;
      titleRef.current.style.background = "rgba(0,0,0,0.3)";
      DescriptionRef.current.style.background = "rgba(0,0,0,0.3)";
    } else {
      titleRef.current.contentEditable = false;
      DescriptionRef.current.contentEditable = false;
      titleRef.current.style.background = "none";
      DescriptionRef.current.style.background = "none";
      const editedContent = {
        userId: todos[index].userId,
        title: titleRef.current.innerText,
        description: DescriptionRef.current.innerText,
        check: todos[index].check,
        id: id,
      };
      try {
        let data = await fetch(`http://localhost:8080/todos/${id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(editedContent),
        });
        if (data.ok) {
          dispatch(editTodo({ id: index, editedContent: editedContent }));
          //   dispatch(toggleTodo({ id: id }));
          //   setcheckLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const DeleteHandler = async (e) => {
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
      navigate(-1);
    }
  };
  const todoCheckHandler = async () => {
    const index = getTodoIndexById(todos, id);
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="todosOuterContainer">
      <div className="sideBar">
        {" "}
        <div
          tooltip={editState ? "save" : "edit"}
          tooltip-position="right"
          className="sideBar-button"
          onClick={editHandler}
        >
          {!editState ? (
            <FontAwesomeIcon icon={faEdit} />
          ) : (
            <FontAwesomeIcon icon={faSave} />
          )}
        </div>
        <div
          tooltip="delete"
          tooltip-position="right"
          className="sideBar-button"
          onClick={DeleteHandler}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div
          tooltip={
            todos && todos[index] && !todos[index].check ? "check" : "uncheck"
          }
          tooltip-position="right"
          className="sideBar-button"
          onClick={todoCheckHandler}
        >
          {todos && todos[index] && !todos[index].check ? (
            <FontAwesomeIcon icon={faSquare} />
          ) : (
            <FontAwesomeIcon icon={faCheckSquare} />
          )}
        </div>
      </div>

      <div className="todosContainer individualTodosContainer">
        <div className="individualTodo">
          <div className="innerIndividualTodo">
            <h1 ref={titleRef} className="individualTitle">
              {todos && todos[index] ? todos[index].title : ""}
            </h1>
            <p ref={DescriptionRef} className="individualDescription">
              {todos && todos[index] ? todos[index].description : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualTodo;
