import React from "react";
import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/home.css";
import { toggleDisplay } from "../features/reducerSlices/addTodoSlice";
import NavUtils from "./navUtils";
function NavBar() {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="navBar">
        <ul className="navbar-ul">
          <li id="logo">
            <NavLink to="/home" className={"home"}>
              TD
            </NavLink>
          </li>
          <li>
            <NavLink to="todos" id="Todos">
              Todos
            </NavLink>
          </li>
          <li>
            <NavLink to="profile" id="Profile">
              Profile
            </NavLink>
          </li>
          <div
            className="navbar-button"
            onClick={() => {
              dispatch(toggleDisplay());
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> New
          </div>
        </ul>
        <NavUtils />
      </div>
      {/* <Navbar  className='Navbar' expand="lg">
      <Container >
        <Navbar.Brand>TODO APP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link  as={NavLink} to='todos'>Todos </Nav.Link>
            <Nav.Link as={NavLink} to='profile'>profile</Nav.Link>
            <Nav.Link onClick={()=>{
              dispatch(toggleDisplay());
            }} >add Todo</Nav.Link>
          </Nav>
      </Container>
    </Navbar> */}

      <Outlet />
    </div>
  );
}

export default NavBar;
