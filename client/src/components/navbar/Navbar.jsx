import logo from "../../assets/logos/logo-no-background.png";
import CustomButton from "../buttons/CustomButton";
import DropdownMenu from "../dropdowns/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../../features/authSlice";
import { RiNotification2Line } from "react-icons/ri";

import "../../App.css";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  const userData = user.data;
  const lenUserData = userData.length;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(clearUserData());
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-secondary fixed z-10 w-full bg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className="md:flex md:items-center md:gap-12 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" width={90} />
          </div>
          {/* <div className="block">
            {user.isLoggedIn && (
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  {userData.role === "admin" && (
                    <li
                      className="text-ternary"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard
                    </li>
                  )}
                  {userData.role === "user" && (
                    <>
                      <li
                        className="text-ternary"
                        onClick={() => navigate("/kitchen")}
                      >
                        Kitchen
                      </li>
                      <li className="text-ternary" onClick={() => {}}>
                        Profile
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            )}
          </div> */}
          <div className="flex items-center gap-5">
            {user.isLoggedIn && (
              <div className="flex flex-col items-end">
                <RiNotification2Line
                  className={isDropdownOpen ? "text-accent" : "text-ternary"}
                  size={20}
                  onClick={toggleDropdown}
                />
                <DropdownMenu className={isDropdownOpen ? "block" : "hidden"} />
              </div>
            )}
            {lenUserData === 0 ? (
              <CustomButton title="Login" onClick={() => navigate("/login")} />
            ) : (
              <CustomButton title="Logout" onClick={handleLogout} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
