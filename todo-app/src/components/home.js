import React from "react";
import NavBar from "./navBar";
import "../css/home.css";
function home() {
  return (
    <div className="home-layout">
      <NavBar />
    </div>
  );
}

export default React.memo(home);
