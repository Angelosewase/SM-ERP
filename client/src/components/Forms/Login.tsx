import Input from "../Ui/Input";
import PasswordInput from "../Ui/PasswordInput";

function LoginForm() {
  return (
    <form className="p-6 rounded-md bg-white flex flex-col  ">
     <Input name="userName" placeholder="Enter username " className="mb-4 pr-8 border-2"/>
      <PasswordInput name="password " placeholder="Enter password "  className="border-2"/>
      <input type="submit" className="hidden" />
      <a
        href="/register"
        className="text-xs font-semibold text-blue-900 hover:underline mb-4"
      >
        forgot password ?
      </a>
      <button
        type="button"
        className="flex text-sm font-semibold items-center justify-center py-1.5 text-white bg-red-600 rounded-md hover:cursor-pointer hover:scale-105 transition-all"
      >
        SIGN IN
      </button>
    </form>
  );
}

export default LoginForm;
