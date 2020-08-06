import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";

import {
  editExperienceDetails,
  deleteExperience,
} from "../../../utils/apiRequests";
import style from "./ExperienceForm.module.css";

function EditExperience() {
  let routerLocation = useLocation();
  const exp = routerLocation.state.experience;
  let history = useHistory();
  const [state, setState] = useState({
    id: exp.id,
    name: "",
    time: "",
    location: "",
    description: "",
    userID: exp.userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //error check result
    editExperienceDetails(state).then((result) => console.log(result));
    history.push("/");
  };

  const handleDelete = () => {
    console.log(state.id);
    deleteExperience(state.id).then((result) => console.log(result));
    history.push("/");
  };

  return (
    <main>
      <div>
        <h1>Editing {exp.name}</h1>
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
              placeholder={exp.name}
            />

            <label>Time</label>
            <input
              type="text"
              name="time"
              value={state.time}
              onChange={handleChange}
              placeholder={exp.time}
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              value={state.location}
              onChange={handleChange}
              placeholder={exp.location}
            />

            <label>Description</label>
            <textarea
              type="text"
              name="description"
              value={state.description}
              onChange={handleChange}
              placeholder={exp.description}
            />

            <button className={style.submitButton} type="submit" value="Submit">
              Submit
            </button>
          </form>
          <button className={style.deleteButton} onClick={handleDelete}>Delete</button>
        </div>
        <div className={style.sideFill} />
      </div>
    </main>
  );
}

export default EditExperience;
