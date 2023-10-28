import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // const isAuthenticated = localStorage.getItem("userToken") ? true : false;

  const isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
