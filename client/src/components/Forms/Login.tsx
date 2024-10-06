import React, { useState } from "react";
import Input from "../Ui/Input";
import PasswordInput from "../Ui/PasswordInput";
import { Login } from "@/app/Api/Login";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSubmission(e: React.FormEvent) {
    e.preventDefault();
    const id = await Login(loginInfo);

    if (!id) {
      return;
    }

    navigate("/sys")
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  }

  return (
    <form className="p-6 rounded-md bg-white flex flex-col">
      <Input
        name="email"
        placeholder="Enter email"
        className="mb-4 pr-8 border-2"
        onChange={handleInputChange}
        value={loginInfo.email}
      />
      <PasswordInput
        name="password"
        placeholder="Enter password "
        className="border-2"
        onChange={handleInputChange}
        value={loginInfo.password}
      />
      <a
        href=""
        className="text-xs font-semibold text-blue-900 hover:underline mb-4"
      >
        forgot password?
      </a>
      <button
        type="button" // Change this to "submit"
        className="flex text-sm font-semibold items-center justify-center py-1.5 text-white bg-red-600 rounded-md hover:cursor-pointer hover:scale-105 transition-all"
        onClick={handleSubmission}
      >
        SIGN IN
      </button>
      <p className="text-xs font-semibold ml-auto mt-2">
        doesn't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          sign up{" "}
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
