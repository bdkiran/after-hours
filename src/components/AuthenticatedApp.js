import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pageComponents/authenticatedPages/Home";
import CreateExperience from "./pageComponents/authenticatedPages/experienceComponents/CreateExperience";
import EditExperience from "./pageComponents/authenticatedPages/experienceComponents/EditExperience";
import ViewExperience from "./pageComponents/authenticatedPages/experienceComponents/ViewExperience";
import UserProfile from "./pageComponents/authenticatedPages/UserProfile"
import Music from "./pageComponents/authenticatedPages/musicComponents/Music";
import NoMatch from "./pageComponents/NoMatch";

import Navigator from "./navigationComponents/Navigator";

function AuthenticatedApp(props) {

  return (
    <div className="App">
      <Navigator isAuthenticated={true} />
      <Switch>
        <Route exact path="/">
          <Home user={props.user} />
        </Route>
        <Route exact path="/user">
          <UserProfile user={props.user} />
        </Route>
        <Route exact path="/createexperience">
          <CreateExperience user={props.user} />
        </Route>
        <Route exact path="/experience/:id" component={ViewExperience} />
        <Route exact path="/experience/edit/:id" component={EditExperience} />

        <Route exact path="/music">
          <Music />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default AuthenticatedApp;
