import { Navigate } from "react-router";
import Login from "./components/authorization/login";
import Home from "./components/Home";

const routes = (isLoggedIn) => [
    {
      path: '',
      element: isLoggedIn ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: '/login',
      element: <Login />
    },
  ];
  
  export default routes;