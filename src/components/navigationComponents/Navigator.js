import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../context/auth-context";
import style from "./Navigator.module.css";

import avatar from './avatar.png'

function Navigator({ isAuthenticated }) {
  const { login, logout } = useAuth();
  const history = useHistory();

  const generateAuthenticationNavigation = () => {
    if (isAuthenticated) {
      return (
        <React.Fragment>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
        <li>
          <div className={style.avatarContainer} onClick={() => history.push("user")}>
            <img src={avatar} alt="Avatar"/>
          </div>
        </li>
        </React.Fragment>
      );
    } else {
      //2 buttons here for easy login.
      const LoginPayload = {
        username: "bcastle",
        password: "password1",
      };
      return (
        <React.Fragment>
          <li>
            <Link to="/login">Login Page</Link>
          </li>
          <li>
            <button onClick={() => login(LoginPayload)}>Login</button>
          </li>
        </React.Fragment>
      );
    }
  };

  return (
    <header className={style.AppHeader}>
      <h1>
        <Link to="/">After Hours</Link>
      </h1>
      <ul>{generateAuthenticationNavigation()}</ul>
    </header>
  );
}

export default Navigator;
