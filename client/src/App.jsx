import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login, Signup, Home, UserDashboard, Error } from "./pages";
import { Toaster } from "sonner";
import { Navbar } from "./components";
import { useEffect, useState } from "react";
import PrivateRoutes from "./utils/PrivateRoutes";

import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchUserData } from "./features/authSlice";

function App() {
  const pathsWithoutNavbar = ["/login", "/signup"];
  const [navbarVisible, setNavbarVisible] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    setNavbarVisible(!pathsWithoutNavbar.includes(path));
  }, [location.pathname]);

  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    if (userToken) {
      const userId = jwtDecode(userToken)._id;
      dispatch(fetchUserData(userId));
    }
  }, [dispatch, userToken]);

  return (
    <div>
      <Toaster richColors={true} />

      {navbarVisible && <Navbar />}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/userDashboard" element={<UserDashboard />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
