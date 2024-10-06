import NavigationMenu from "@/components/custom/Navigation";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex">
      <NavigationMenu />
      <div className=" flex-1  bg-gray-100">
      <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout;
