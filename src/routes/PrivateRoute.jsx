import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useNavigate } from "react-router";
import Loader from "../loader/Loader";

const PrivateRoute = ({ children }) => {
const navigate = useNavigate();
const { user, loading } = useContext(AuthContext);

  if(loading){
        return <Loader></Loader>
  }

  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>
  // return navigate("/login");
};

export default PrivateRoute;
