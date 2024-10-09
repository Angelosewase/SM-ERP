import { IsAuth } from "@/app/Api/auth";
import NavigationMenu from "@/components/custom/Navigation";
import { useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const [maximize, setMaximize] = useState<boolean>(true);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    async function isAuth() {
      const isLoggedIn: string | null = await IsAuth();

      if (!isLoggedIn) {
        navigate("/");
        return;
      }
    }
    isAuth();
  }, [navigate]);
  return (
    <div className="flex flex-1">
      <NavigationMenu maximize={maximize} setMaximize={setMaximize} />
      <div
        className={` flex-1  bg-gray-200 ${maximize ? "ml-[270px]" : "ml-20"}`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
