import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../features/reducerSlices/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const user = useSelector((store) => store.user.userId);
  const [editState, setEditState] = useState(false);

  const editHandler = async () => {
    setEditState(!editState);
    if (!editState) {
      nameRef.current.contentEditable = true;
      ageRef.current.contentEditable = true;
      emailRef.current.contentEditable = true;
      phoneRef.current.contentEditable = true;
      nameRef.current.style.background = "rgba(0,0,0,0.3)";
      ageRef.current.style.background = "rgba(0,0,0,0.3)";
      emailRef.current.style.background = "rgba(0,0,0,0.3)";
      phoneRef.current.style.background = "rgba(0,0,0,0.3)";
    } else {
      nameRef.current.contentEditable = false;
      ageRef.current.contentEditable = false;
      emailRef.current.contentEditable = false;
      phoneRef.current.contentEditable = false;
      nameRef.current.style.background = "none";
      ageRef.current.style.background = "none";
      emailRef.current.style.background = "none";
      phoneRef.current.style.background = "none";
      const editedContent = {
        id: user.id,
        name: nameRef.current.innerText,
        age: ageRef.current.innerText,
        email: emailRef.current.innerText,
        phoneNo: phoneRef.current.innerText,
      };
      try {
        let data = await fetch(`http://localhost:8080/users/${user.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(editedContent),
        });
        if (data.ok) {
          dispatch(logInUser(editedContent));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="todosOuterContainer">
      <div className="sideBar">
        <div
          className="sideBar-button"
          tooltip="edit"
          tooltip-position="right"
          onClick={editHandler}
        >
          {!editState ? (
            <FontAwesomeIcon icon={faEdit} />
          ) : (
            <FontAwesomeIcon icon={faSave} />
          )}
        </div>
      </div>
      <div className="todosContainer profileContainer">
        <div className="profileInnerContainer">
          <div className="detailsContainer">
            <span>Name:</span>
            <span ref={nameRef}>{user.name}</span>
          </div>
          <div className="detailsContainer">
            <span>Age:</span>
            <span ref={ageRef}>{user.age}</span>
          </div>
          <div className="detailsContainer">
            <span>Email:</span>
            <span ref={emailRef}>{user.email}</span>
          </div>
          <div className="detailsContainer">
            <span>Phone No:</span>
            <span ref={phoneRef}>{user.phoneNo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
