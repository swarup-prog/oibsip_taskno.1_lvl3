import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { TextInput, CustomButton } from "../../components";
import { toastError, toastSuccess } from "../../utils/toast";
import { PostRequest } from "../../services/httpRequest";
import { useDispatch } from "react-redux";
import { setOTP } from "../../features/otpSlice";

import "../../App.css";
import bgimg from "../../assets/bgimg.jpg";
import logo from "../../assets/logos/logo-white-transparent.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PostRequest("/auth/login", formData);
      if (response.status === 200) {
        toastSuccess(response.data.message);
        localStorage.setItem("userToken", response.data.token);
        navigate("/dashboard");
      }
      console.log("response", response);
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  const handleForgotPassword = async () => {
    const email = formData.email;
    if (email === "") {
      toastError("Email field is empty.");
    } else {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      dispatch(setOTP(OTP));

      try {
        const response = await PostRequest("/recovery/mail", { email, OTP });
        if (response.status === 200) {
          toastSuccess(response.data.message);
          navigate(`/recovery/${formData.email}`);
        }
      } catch (error) {
        toastError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="absolute z-20 top-4 left-4 text-secondary hover:text-accent flex gap-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <BsArrowBarLeft size={25} />
        Home
      </div>
      <section
        className=" hidden  flex-1 bg-secondary min-h-screen lg:flex"
        style={{
          background: `url(${bgimg})`,
          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <div class="backdrop-blur-md absolute inset-0 -z-10"></div>
          <img src={logo} alt="" size />
        </div>
      </section>
      <section className="flex flex-col justify-center items-center gap-10 min-w-full min-h-screen bg-secondary lg:flex-1 lg:min-w-0 p-5 lg:ml-[50%] ">
        <h1 className="text-2xl text-primaryT font-bold">LOGIN</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextInput
            type="text"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <CustomButton
            // isDisabled={isLoading ? true : false}
            type="submit"
            title="Login"
          />
        </form>
        <div
          className="text-accent hover:underline cursor-pointer"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </div>
        <div className="flex gap-2 text-primaryT">
          Don't have an acount?
          <span
            className="text-accent font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </div>
      </section>
    </div>
  );
};

export default Login;
