import NavigationMenu from "@/components/custom/Navigation";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex ">
      <NavigationMenu />
      <div className="border flex-1 ">
      <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;
