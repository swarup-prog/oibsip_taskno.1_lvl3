import { CustomButton } from "../../components";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen px-4 bg-white place-content-center">
      <div className="flex flex-col items-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-primary sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-ternary">We can't find that page.</p>

        <CustomButton
          title="Go Back Home"
          className="mt-6"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default Error;
