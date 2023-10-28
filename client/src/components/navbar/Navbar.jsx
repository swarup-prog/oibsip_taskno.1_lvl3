import logo from "../../assets/logos/logo-no-background.png";
import CustomButton from "../buttons/CustomButton";

import { useNavigate } from "react-router-dom";
import "../../App.css";

const SideNavigation = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[rgb(255,255,255)] absolute z-10 w-full bg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className="md:flex md:items-center md:gap-12 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" width={90} />
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li className="text-ternary">Dashboard</li>
                <li className="text-ternary">Orders</li>
              </ul>
            </nav>
          </div>

          <CustomButton title="Login" onClick={() => navigate("/login")} />
        </div>
      </div>
    </header>
  );
};

export default SideNavigation;
