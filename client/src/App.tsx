import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DumyPage from "./pages/DumyPage";
import DummyPage2 from "./pages/DummyPage2";

const routes = createBrowserRouter([
  { path: "/", Component: Login },
  {
    path: "/register",
    Component: SignUp,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children:[
      {
        path:"/dashboard/test",
         Component:DumyPage
      },
      {
        path:"/dashboard/test2",
        Component:DummyPage2
      }
    ]
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
