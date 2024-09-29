import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

// const AuthLayout = ({ allowedRoles }) => {
//   const { user,loading } = useAuth();

//   console.log("User Role: ", user);
  
//   const location = useLocation();

//   if(loading)
//     return <Loader/>

 
//   ) : user && user.role == "user" ? (
//     <Navigate to="/unauthorized" state={{ from: location }} replace />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };


const AuthLayout = ({ allowedRoles,children }) => {
  const { user, loading } = useAuth();
  
  // Check if user is undefined or has no roles

  if(loading){
    return <Loader/>
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const location = useLocation();
  
  return user && allowedRoles.includes(user?.role) ? (
   children
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default AuthLayout;
