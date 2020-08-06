import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../context/auth-context";

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    //need to handle when this fails
    //want error to be returned here
    let loginRequstValid = await login(state);
    //console.log(loginError)
    if (loginRequstValid === false) {
      setState((prevState) => ({
        ...prevState,
        authError: true,
      }));
      return;
    }
    //login and send to home page
    history.push("/");
  };

  const loginError = () => {
    return (
      <div>
        <h3>Invalid Username or Password</h3>
      </div>
    )
  }

  return (
    <main>
      <h1>Login</h1>
      {
        state.authError ? loginError() : <div />
      }
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          <br />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <br />

          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
