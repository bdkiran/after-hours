import React from "react";
import ExperienceList from "./experienceComponents/ExperienceList";

import { Link } from "react-router-dom";
import style from "./Home.module.css";

export default function Home({user}) {
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
      </main>
    </React.Fragment>
  );
}
