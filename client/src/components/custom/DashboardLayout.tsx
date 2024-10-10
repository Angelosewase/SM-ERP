import { IsAuth } from "@/app/Api/auth";
import { getAccountDetails } from "@/app/Api/details";
import { fetchSchoolSuccess, schoolSelector } from "@/app/features/schoolSlice";
import { fetchUserSuccess, userSelector } from "@/app/features/userSlice";
import NavigationMenu from "@/components/custom/Navigation";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const [maximize, setMaximize] = useState<boolean>(true);
  const navigate = useNavigate();

  const user = useSelector(userSelector).user;
  const school = useSelector(schoolSelector).school;
  const dispatch = useDispatch();

  if (!user || !school) {
    console.log("revalidating")
    getAccountDetails().then((data) => {
      if (data?.school) dispatch(fetchSchoolSuccess(data.school));
      if (data?.user) dispatch(fetchUserSuccess(data.user));
    }).catch(err =>console.log(err));
  }

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
