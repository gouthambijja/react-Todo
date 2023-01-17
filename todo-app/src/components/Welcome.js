import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNoofchecked } from "../todoApp";

function Welcome() {
  const [load, setLoad] = useState(false);
  const userId = useSelector((store) => store.user.userId);
  const todo = useSelector((store) => store.todo.todos);
  const done = getNoofchecked(todo);
  const [quote, setQuote] = useState("");
  const nextQuote = async () => {
    setLoad(true);
    const quote = await fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((res) => res);
    setQuote(quote.content);
    setLoad(false);
  };
  useEffect(() => {
    console.log(quote);
    if (quote === "") nextQuote();
  }, []);
  return (
    <div className="todosOuterContainer">
      <div className="sideBar">
        <div
          className="sideBar-button"
          onClick={nextQuote}
          tooltip="next quote"
          tooltip-position="right"
        >
          {!load ? (
            <FontAwesomeIcon icon={faChevronCircleRight} />
          ) : (
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          )}{" "}
        </div>
      </div>
      <div className="todosContainer WelcomeContainer">
        <div className="welcomeInnerContainer">
          <div className="welcomeName">
            <span>Hello </span>
            <h3>{` , ${userId.name}!`}</h3>
          </div>
          <div className="welcomeDesc">
            <div>Total pending Todos - {todo.length - done} |</div>
            <div>| Todos completed - {done}</div>
          </div>
          <div className="welcomeNote">"{quote}"</div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
