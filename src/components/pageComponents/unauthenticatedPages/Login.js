import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../context/auth-context";
import style from './Login.module.css'


export default function Login() {
  const [state, setState] = useState({
    authError: false,
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let history = useHistory();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //If the login request fails, set error to true
    let loginRequstValid = await login(state);
    if (loginRequstValid === false) {
      setState((prevState) => ({
        ...prevState,
        authError: true,
      }));
      return;
    }
    //log in successful, route to home page
    history.push("/");
  };

  const loginError = () => {
    return (
      <div className={style.loginError}>
        <h3>Invalid Username or Password</h3>
      </div>
    )
  }

  return (
    <main>
      <h1>Login</h1>
      <div className={style.loginContainer}>
        <div className={style.sideFill}/>
        <div className={style.loginFormContainer}>
        {
          state.authError ? loginError() : null
        }
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={state.username}
              onChange={handleChange}
            />
            <br />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
            />
            <br />

            <button className={style.submitButton} type="submit" value="Submit">
              Log In
          </button>
          </form>
        </div>
        <div className={style.sideFill}/>
      </div>
    </main>
  );
}
