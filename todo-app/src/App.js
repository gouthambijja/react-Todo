import React, { useRef, useState } from "react";
import { Form, Outlet } from "react-router-dom";
import "./css/todoApp.css";
import "./css/tooltip.css";

function App() {
  const newUserRef = useRef(null);
  const [idExist, setIdExist] = useState("");
  const [newUserValue, setNewUserValue] = useState("");
  const [newUserNameValue, setNewUserNameValue] = useState("");
  const [newUserAgeValue, setNewUserAgeValue] = useState("");
  const [newUserEmailValue, setNewUserEmailValue] = useState("");
  const [newUserPhoneNoValue, setNewUserPhoneNoValue] = useState("");

  const newUserIdHandler = async (e) => {
    const value = e.target.value;
    setNewUserValue(value);
    if (value === "") {
      setIdExist("");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/users/${value}`);
      if (res.ok) {
        setIdExist("id already exist");
        newUserRef.current.setAttribute("disabled", "");
      } else {
        setIdExist("id can be used");
        newUserRef.current.removeAttribute("disabled");
      }
    } catch {}
  };

  return (
    <div className="authenticateContainer">
      <div className="formContainer box">
        <Form method="post" id={"enterForm"} action="#">
          <div className="formElement ">
            <label className="fw" htmlFor="userId">
              Enter User Id:
            </label>
          </div>
          <div className="formElement ">
            {" "}
            <input
              type="text"
              className="fw"
              autoComplete="off"
              name="userId"
              placeholder="user id"
              id="userId"
              required
            />
          </div>
          <div className="formElement ">
            <button id="button" className="fw" type="submit">
              submit
            </button>
          </div>
        </Form>
        <div className="formElement seperator">
          <span className="horizontal-line"></span>
          <span className="or-seperator">or</span>
          <span className="horizontal-line"></span>
        </div>
        <Form method="post" id="idForm" action="#">
          <div className="formElement ">
            <label className="fw" htmlFor="newUserId">
              Register
            </label>
          </div>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              pattern="[0-9]{1,7}"
              type="text"
              placeholder="id in Numbers"
              autoComplete="off"
              name="newUserId"
              id="newUserId"
              value={newUserValue}
              onChange={newUserIdHandler}
              required
            />
          </div>
          <span className="idExist">{idExist}.</span>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              type="text"
              pattern="[a-z]{1,12}"
              placeholder="name"
              autoComplete="off"
              name="newUserName"
              id="newUserName"
              value={newUserNameValue}
              onChange={(e) => {
                setNewUserNameValue(e.target.value);
              }}
              required
            />
          </div>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              type="number"
              placeholder="age"
              autoComplete="off"
              name="newUserAge"
              id="newUserAge"
              value={newUserAgeValue}
              onChange={(e) => {
                setNewUserAgeValue(e.target.value);
              }}
              required
            />
          </div>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              type="email"
              style={{ fontFamily: "tahoma" }}
              placeholder="email"
              autoComplete="off"
              name="newUserEmail"
              id="newUserEmail"
              value={newUserEmailValue}
              onChange={(e) => {
                setNewUserEmailValue(e.target.value);
              }}
              required
            />
          </div>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              type="tell"
              placeholder="phone no"
              autoComplete="off"
              name="newUserPhoneNo"
              id="newUserPhoneNo"
              value={newUserPhoneNoValue}
              onChange={(e) => {
                setNewUserPhoneNoValue(e.target.value);
              }}
              required
            />
          </div>
          <div className="formElement ">
            <button id="button" className="fw" ref={newUserRef} type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
