import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login, Signup, Home, UserDashboard, Error } from "./pages";
import { Toaster } from "sonner";
import { Navbar } from "./components";
import { useEffect, useState } from "react";
import PrivateRoutes from "./utils/PrivateRoutes";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  const pathsWithoutNavbar = ["/login", "/signup"];
  const [navbarVisible, setNavbarVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setNavbarVisible(!pathsWithoutNavbar.includes(path));
  }, [location.pathname]);

  return (
    <div>
      <Toaster richColors={true} />
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
