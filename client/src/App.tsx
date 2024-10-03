import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";

const routes = createBrowserRouter([{ path: "/", Component: Login }]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
