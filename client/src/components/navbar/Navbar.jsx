import logo from "../../assets/logos/logo-no-background.png";
import CustomButton from "../buttons/CustomButton";
import DropdownMenu from "../dropdowns/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiNotification2Line } from "react-icons/ri";

import "../../App.css";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData);
  const notification = useSelector((state) => state.notification);
  const userData = user.data;
  const lenUserData = userData.length;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isRead, setIsRead] = useState(notification.isRead);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsRead(true);
  };

  return (
    <header className="bg-secondary fixed z-10 w-full bg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className="md:flex md:items-center md:gap-12 cursor-pointer"
            onClick={() => {
              navigate(lenUserData > 0 ? "/" : "/dashboard");
            }}
          >
            <img src={logo} alt="Logo" width={90} />
          </div>

          <div className="flex items-center gap-7">
            {user.isLoggedIn && (
              <div className="flex flex-col items-end">
                <span
                  className={`absolute w-2 h-2 rounded-full ${
                    isRead ? "bg-transparent" : "bg-accent"
                  }`}
                ></span>
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
              <div className="flex flex-col justify-center border-2 border-solid border-accent rounded md py-1 pl-3 pr-6 cursor-default">
                <h3 className="text-sm font-medium">{user.data.name}</h3>
                <p className="text-xs text-gray-400">{user.data.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
