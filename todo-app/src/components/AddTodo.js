import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleDisplay } from "../features/reducerSlices/addTodoSlice";
import { addTodo } from "../features/reducerSlices/todosSlice";
function AddTodo() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [titleInputValue, setTitleValue] = useState("");
  const [descriptionInputValue, setDescriptionValue] = useState("");
  const drRef = useRef(null);
  const wRef = useRef(null);
  const eRef = useRef(null);
  const hRef = useRef(null);
  const lRef = useRef(null);
  const oRef = useRef(null);
  const titleInputHandler = (e) => {
    setTitleValue(e.target.value);
  };
  const descriptionInputHandler = (e) => {
    setDescriptionValue(e.target.value);
  };
  const AddButtonHandler = async (e) => {
    e.preventDefault();
    let category;
    drRef.current.checked
      ? (category = "dailyRoutine")
      : wRef.current.checked
      ? (category = "work")
      : eRef.current.checked
      ? (category = "entertainment")
      : hRef.current.checked
      ? (category = "health")
      : lRef.current.checked
      ? (category = "Learnings")
      : (category = "others");
    if (titleInputValue === "" || descriptionInputValue === "") return;
    setLoading(true);
    e.target.setAttribute("disabled", "");
    const userId = window.localStorage.getItem("userId");
    let Pdata = await fetch(`http://localhost:8080/todos`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        title: titleInputValue,
        category: category,
        description: descriptionInputValue,
        check: false,
      }),
    });
    if (Pdata.ok) {
      Pdata = await Pdata.json();
      dispatch(addTodo(Pdata));
    }
    setLoading(false);
    e.target.removeAttribute("disabled");
    setTitleValue("");
    setDescriptionValue("");
    dispatch(toggleDisplay());
  };

  return (
    <div
      id="addTodoOuterContainer"
      onClick={(e) => {
        if (e.target.id === "addTodoOuterContainer") {
          dispatch(toggleDisplay());
        }
      }}
    >
      <div id="addTodoContainer">
        <textarea
          type="text"
          name="todoTitle"
          placeholder="title"
          id="todoTitleInput"
          value={titleInputValue}
          required
          onChange={(e) => titleInputHandler(e)}
        />
        <textarea
          type="text"
          name="todoDescription"
          id="todoDescriptionInput"
          placeholder="description"
          required
          value={descriptionInputValue}
          onChange={(e) => descriptionInputHandler(e)}
        />
        <div id="addTodoCategory">
          <span>
            <input
              type="radio"
              ref={drRef}
              id="dr"
              name="category"
              value="Daily Routine"
              required
            />
            <label htmlFor="dr">Daily Routine</label>
          </span>
          <span>
            <input
              type="radio"
              ref={wRef}
              id="w"
              name="category"
              value="Work"
            />
            <label htmlFor="w">Work</label>
          </span>
          <span>
            <input
              type="radio"
              ref={eRef}
              id="e"
              name="category"
              value="Entertainment"
            />
            <label htmlFor="e">Entertainment</label>
          </span>
          <span>
            <input
              type="radio"
              ref={hRef}
              id="h"
              name="category"
              value="Health"
            />
            <label htmlFor="h">Health</label>
          </span>
          <span>
            <input
              type="radio"
              ref={lRef}
              id="l"
              name="category"
              value="Learning"
            />
            <label htmlFor="l">Learning</label>
          </span>
          <span>
            <input
              type="radio"
              ref={oRef}
              id="o"
              name="category"
              value="Others"
            />
            <label htmlFor="o">Others</label>
          </span>
        </div>
        <button type="submit" id="addTodoButton" onClick={AddButtonHandler}>
          {loading ? "loading" : "add"}
        </button>
      </div>
    </div>
  );
}

export default React.memo(AddTodo);
