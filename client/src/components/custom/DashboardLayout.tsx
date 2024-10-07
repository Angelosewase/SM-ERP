import NavigationMenu from "@/components/custom/Navigation";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [maximize, setMaximize] = useState<boolean>(true);
  return (
    <div className="flex flex-1">
      <NavigationMenu maximize={maximize} setMaximize={setMaximize}/>
      <div className={` flex-1  bg-gray-200 ${maximize ? 'ml-[270px]': 'ml-20'}`}>
      <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout;
