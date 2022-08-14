import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ children, ...res }: any) => {
    let auth = { token: localStorage.getItem("GoogleToken") };
    
    return <Route {...res}>{!auth.token ? <Redirect to="/" /> : children}</Route>;
}

export default PrivateRoutes;
