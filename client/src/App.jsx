import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  Login,
  Signup,
  Home,
  Kitchen,
  Error,
  OTPInput,
  ResetPassword,
  AdminInventory,
} from "./pages";
import { Toaster } from "sonner";
import { Navbar } from "./components";
import { useEffect, useState } from "react";
import PrivateRoutes from "./utils/PrivateRoutes";

import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchUserData } from "./features/authSlice";
import { fetchIngredients } from "./features/inventorySlice";
import { fetchNotification } from "./features/notificationSlice";

function App() {
  const navigate = useNavigate();
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
      dispatch(fetchIngredients());
      dispatch(fetchNotification(userId));
      navigate("/dashboard");
    }
  }, [dispatch, userToken]);

  const user = useSelector((state) => state.userData);

  return (
    <div>
      <Toaster richColors={true} />

      {navbarVisible && <Navbar />}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            exact
            path="/dashboard"
            element={
              user.data.role === "admin" ? <AdminInventory /> : <Kitchen />
            }
          />
        </Route>
        {!user.isLoggedIn && <Route exact path="/" element={<Home />} />}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="/recovery/:email" element={<OTPInput />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
