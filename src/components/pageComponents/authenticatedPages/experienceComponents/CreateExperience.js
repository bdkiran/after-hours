import React, { useState } from "react";

import { useHistory } from "react-router";

import { createExperience } from "../../../../utils/apiRequests";
import style from "./ExperienceForm.module.css";

function CreateExperience({user}) {
  const [state, setState] = useState({
    //generate id server side??
    id: "2",
    name: "",
    time: "",
    location: "",
    description: "",
    userID: user.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    createExperience(state).then((result) => {
      //Error check result?
      console.log(result);
    });
    history.push("/");
  };

  return (
    <main>
      <div>
        <h1>Create a New Experience</h1>
      </div>
      <div className={style.mainContent}>
        <div className={style.sideFill} />
        <div className={style.formContainer}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              placeholder={"Experience Name"}
            />

            <label>Time</label>
            <input
              type="text"
              name="time"
              value={state.time}
              onChange={handleChange}
              placeholder={"Experience Time"}
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              value={state.location}
              onChange={handleChange}
              placeholder={"Experience Location"}
            />

            <label>Description</label>
            <textarea
              type="text"
              name="description"
              value={state.description}
              onChange={handleChange}
              placeholder={"Add a Description to your Experience"}
            />
            <button className={style.submitButton} type="submit" value="Submit">
              Submit
            </button>
          </form>
        </div>
        <div className={style.sideFill} />
      </div>
    </main>
  );
}

export default CreateExperience;
