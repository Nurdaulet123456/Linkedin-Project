import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoutes from "../../utils/PrivateRoutes";
import Sigin from "../Pages/Autorizations/Sigin";
import Signup from "../Pages/Autorizations/Signup";
import MainPage from "../Pages/Main-Page/Main.Page";
import HeadersLogin from "../Headers/Headers.Login";
import HeadersLogout from "../Headers/Headers.Logout";
import ForgetPassword from "../Pages/Autorizations/ForgetPassword";

const App: React.FC = () => {
  
  return (
    <>
    {
      localStorage.getItem('GoogleToken')
       ?
       <HeadersLogout /> :
       <HeadersLogin />
    }
      <Router>
        <Switch>
          <PrivateRoutes exact path={"/main"}>
            <MainPage />
          </PrivateRoutes>
          <Route exact path={"/"}>
            <Sigin />
          </Route>
          <Route exact path={"/signup"}>
            <Signup />
          </Route>
          <Route exact path={"/forgetPassword"}>
            <ForgetPassword />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
