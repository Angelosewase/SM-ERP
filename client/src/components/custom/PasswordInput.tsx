import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  placeholder?: string;
  label?: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name = "password",
  placeholder = "Enter your password",
  label ,
  error = "",
  className = "",
  ...props
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const inputClasses = `placeholder:text-gray-400 py-1.5 pl-4 pr-1 border rounded border-gray-400 outline-2 outline-sky-500 flex gap-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 ${className || ""}`;

  return (
    <div>
      {label && <label className="flex items-center text-md font-medium text-gray-700 mb-0.5">{label}</label>}
      <div className={inputClasses}>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none flex-grow"
          {...props}
        />
        <span onClick={handleToggle} className="cursor-pointer">
          {showPassword ? (
            <EyeSlashIcon className="w-5 h-5 my-auto text-gray-500" />
          ) : (
            <EyeIcon className="w-5 h-5 text-gray-500 my-auto" />
          )}
        </span>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
