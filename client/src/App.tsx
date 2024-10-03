import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const routes = createBrowserRouter([
  { path: "/",
    Component: Login 
  },
  {
    path: "/register",
    Component: SignUp,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
