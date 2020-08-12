import React, { useRef } from "react";
import ExperienceList from "./experienceComponents/ExperienceList";

import { submitImage } from "../../../utils/mediaRequest"

import { Link } from "react-router-dom";
import style from "./Home.module.css";

export default function Home({ user }) {
    //Figure out where this component is needed....
  var fileRef = useRef(null)

  const fileSubmit = (e) => {
    e.preventDefault()
    console.log(fileRef.current.name)
    //Creates our form data object
    var data = new FormData()
    data.append(fileRef.current.name, fileRef.current.files[0])
    //Is user id neccesary?
    //Submits to backend
    submitImage(data)
  }

  return (
    <React.Fragment>
      <main>
        <div>
          <h1>Welcome {user.username}</h1>
        </div>
        <div>
          <Link className={style.createExperienceLinkButton} to="/createexperience">Create Experience</Link>
        </div>
        <ExperienceList userId={user.id} />
        <div>
          <form
            onSubmit={e => fileSubmit(e)}
          >
            <input type="file" accept='image/*' name="myFile" ref={fileRef} />
            <input type="submit" value="upload" />
          </form>
        </div>
      </main>
    </React.Fragment>
  );
}
