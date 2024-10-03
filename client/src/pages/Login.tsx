import LoginForm from "../components/Forms/Login";

function Login() {
  return (
    <div className="flex  w-[100vw] h-[100vh] justify-center items-center">
      <div className=" bg-blue-900 w-[55vw] h-[70vh] flex">
        <div className="w-7/12 relative ">
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
