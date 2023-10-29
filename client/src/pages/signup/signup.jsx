import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";
import { TextInput, CustomButton } from "../../components";
import { toastError, toastSuccess } from "../../utils/toast";
import { PostRequest } from "../../services/httpRequest";

import "../../App.css";
import bgimg from "../../assets/bgimg.jpg";
import logo from "../../assets/logos/logo-white-transparent.png";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkPasswordMatch = () => {
    if (formData.password !== formData.confirmPassword) {
      toastError("Password did not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...formDataRequest } = formData;
    if (checkPasswordMatch()) {
      try {
        const response = await PostRequest("/auth/register", formDataRequest);
        if (response.status === 201) {
          toastSuccess(response.data.message);
          navigate("/login");
        }
        console.log("response", response);
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
        <h1 className="text-2xl text-primaryT font-bold">SIGNUP</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextInput
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextInput
            type="email"
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
          <TextInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <CustomButton
            // isDisabled={isLoading ? true : false}
            type="submit"
            title="Signup"
          />
        </form>
        <div className="flex gap-2 text-primaryT">
          Already have an acount?
          <span
            className="text-accent font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Login
          </span>
        </div>
      </section>
    </div>
  );
};

export default Signup;
