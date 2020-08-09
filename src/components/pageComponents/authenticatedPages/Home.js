import React from "react";
import ExperienceList from "./experienceComponents/ExperienceList";

import { Link } from "react-router-dom";

export default function Home({user}) {
  return (
    <React.Fragment>
      <main>
        <div>
          <h1>Welcome {user.username}</h1>
        </div>
        <Link to="/createexperience">Create a new experience</Link>
        <ExperienceList userId={user.id} />
      </main>
    </React.Fragment>
  );
}
