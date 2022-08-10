import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sigin from "../Pages/Autorizations/Sigin";
import Signup from "../Pages/Autorizations/Signup";
import MainPage from "../Pages/Main-Page/Main.Page";
import HeadersLogin from "../Headers/Headers.Login";

const App: React.FC = () => {
  return (
    <>
      <HeadersLogin />
      <Router>
        <Switch>
          <Route exact path={"/main"}>
            <MainPage />
          </Route>
          <Route exact path={"/"}>
            <Sigin />
          </Route>
          <Route exact path={"/signup"}>
            <Signup />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
