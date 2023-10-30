import { CustomButton } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Error = ({ error }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData);
  const userRole = user.data.role;

  const details = {
    user: {
      title: "Go To Dashboard",
      nav: "/dashboard",
    },
    admin: {
      title: "Go To Inventory",
      nav: "/inventory",
    },
    user: {
      title: "Go To Home",
      nav: "/",
    },
  };

  return (
    <div className="flex justify-center items-center h-screen px-4 bg-white place-content-center">
      <div className="flex flex-col items-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-primary sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-ternary">
          {error ? error : "We can't find that page."}
        </p>

        <CustomButton
          title={
            user.data.role === "user"
              ? "Go To Dashboard"
              : user.data.role === "admin"
              ? "Go To Inventory"
              : "Go Back Home"
          }
          className="mt-6"
          onClick={() =>
            navigate(
              user.data.role === "user"
                ? "/dashboard"
                : user.data.role === "admin"
                ? "/inventory"
                : "/"
            )
          }
        />
      </div>
    </div>
  );
};

export default Error;
