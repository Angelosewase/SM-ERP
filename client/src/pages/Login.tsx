import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Forms/Login";
import { useLayoutEffect } from "react";
import { IsAuth } from "@/app/Api/auth";

function Login() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    async function isAuth() {
      const isLoggedIn: string | null = await IsAuth();

      if (isLoggedIn) {
        navigate("/sys");
        return;
      }
    }
    isAuth();
  }, [navigate]);
  return (
    <div className="flex  w-[100vw] h-[100vh] justify-center items-center">
      <div className=" bg-blue-900 w-[65vw] h-[70vh] flex">
        <div className="w-6/12 relative ">
          <img src="/logIn.png" alt="" className="w-full h-full" />
          <div className="absolute top-56 left-16">
            <p className="text-5xl font-semibold text-white ">
              Welcome back !{" "}
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center flex-col gap-4 ">
          <LoginForm />
          <p className="text-xs text-white font-semibold">
            @brainiacs academy 2024
          </p>
        </div>
      </div>
      <a></a>
    </div>
  );
}

export default Login;
