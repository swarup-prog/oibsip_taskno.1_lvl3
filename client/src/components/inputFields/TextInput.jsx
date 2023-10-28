import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const TextInput = ({ type, value, onChange, name, label }) => {
  const [inputType, setInputType] = useState(type);

  const handlePasswordVisibility = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="min-w-[332px] block overflow-hidden rounded-lg border border-accent px-3 py-2 lg:w-[300px] shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-red-500 "
      >
        <span className="text-xs font-medium text-primaryT ">{label}</span>

        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className="mt-1 w-full border-none bg-transparent text-primaryT p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm relative"
        />

        {type === "password" && (
          <span
            className="absolute top-1/2 right-3"
            onClick={handlePasswordVisibility}
          >
            {inputType === "password" ? (
              <AiOutlineEyeInvisible size={20} className="text-primaryT" />
            ) : (
              <AiOutlineEye size={20} className="text-primaryT" />
            )}
          </span>
        )}
      </label>
    </div>
  );
};

export default TextInput;
