import React from "react";
import Login from "./pageComponents/unauthenticatedPages/Login";
import Home from "./pageComponents/unauthenticatedPages/Home";
import NoMatch from "./pageComponents/NoMatch";

import Navigator from "./navigationComponents/Navigator";
import { Switch, Route } from "react-router-dom";

function UnathenticatedApp() {

  return (
    <div className="App">
      <Navigator isAuthenticated={false} />
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="*">
          <NoMatch/>
        </Route>
      </Switch>
    </div>
  );
}

export default UnathenticatedApp;
