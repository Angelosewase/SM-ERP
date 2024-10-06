import {
  AcademicCapIcon,
  Bars3BottomRightIcon,
  BookOpenIcon,
  CircleStackIcon,
  Cog8ToothIcon,
  RectangleGroupIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

import { DropDown, NavigationComponent } from "./NavigationItem";
import { Link } from "react-router-dom";

function NavigationMenu() {
  const [maximize, setMaximize] = useState<boolean>(true);

  return (
    <div
      className={`h-[100vh] ${
        !maximize && "w-20"
      } bg-blue-900 transition-all duration-300 overflow-auto `}
    >
      <div>
        <div className="bg-red-700 h-16 flex justify-between px-4">
          <img
            src="/schoolLogo.png"
            alt="school logo"
            className={`w-10 h-auto self-center ${!maximize && "hidden"}`}
          />
          <button onClick={() => setMaximize(!maximize)}>
            <Bars3BottomRightIcon className="text-white h-10" />
          </button>
        </div>
        <NavigationComponent
          Item={<RectangleGroupIcon className="w-8" />}
          label="Dashboard"
          showLabel={maximize}
          link="/sys"
        />
        <NavigationComponent
          Item={
            <DropDown
              Item={
                <div className="flex gap-4 items-center">
                  <AcademicCapIcon className="w-8" /> {maximize && "Students"}
                </div>
              }
              content={
              
                  <div >
                    <Link to={"/sys/allStudents"} className="font-semibold p-2 my-0.5 hover:bg-blue-950 block">
                      All students
                    </Link>
                    <Link to={"/sys/addStudent"} className="font-semibold p-2 my-0.5 hover:bg-blue-950 block">
                      Add student
                    </Link>
                    <Link to={"/sys/studentsPromotion"} className="font-semibold p-2 my-0.5 hover:bg-blue-950 block">
                      Students promotion
                    </Link>
                  </div>
              }
              maximize={maximize}
              setMaximize={setMaximize}
            />
          }
        />

        <NavigationComponent
          Item={<UserGroupIcon className="w-8" />}
          label="Parents"
          showLabel={maximize}
          link="/sys/parents"
        />

        <NavigationComponent
          Item={
            <DropDown
              Item={
                <div className="flex gap-4 items-center">
                  <AcademicCapIcon className="w-8" /> {maximize && "Teachers"}
                </div>
              }
              content={
                <div>
                  <Link to={"/sys/allTeachers"} className="font-semibold p-2 my-0.5 hover:bg-blue-950  block">
                    All teachers
                  </Link>
                  <Link to={"/sys/addTeacher"} className="font-semibold p-2 my-0.5 hover:bg-blue-950 block">
                    Add teachers
                  </Link>
                </div>
              }
              maximize={maximize}
              setMaximize={setMaximize}
            />
          }
        />

        <NavigationComponent
          Item={
            <DropDown
              Item={
                <div className="flex gap-4 items-center">
                  <CircleStackIcon className="w-8" /> {maximize && "Account"}
                </div>
              }
              content={
                <div>
                  <Link to={"/sys/feesGroup"} className="font-semibold p-2 my-0.5 hover:bg-blue-950 block">
                    Fees group
                  </Link>
                  <Link to={"/sys/studentFees"} className="font-semibold p-2 my-0.5 hover:bg-blue-950 block">
                    Student fees
                  </Link>
                  <Link to={"/sys/expenses"} className="font-semibold p-2 my-0.5 hover:bg-blue-950 block">
                    Expenses
                  </Link>
                  <Link to={"/sys/addExpense"} className="font-semibold p-2 my-0.5 hover:bg-blue-950 block">
                    Add fees
                  </Link>
                </div>
              }
              maximize={maximize}
              setMaximize={setMaximize}
            />
          }
        />

        <NavigationComponent
          Item={<BookOpenIcon className="w-8" />}
          label="Subjects"
          showLabel={maximize}
          link="/sys/subject"
        />
        <NavigationComponent
          Item={<Cog8ToothIcon className="w-8" />}
          label="Settings"
          showLabel={maximize}
          link="/sys/settings"
        />
      </div>
    </div>
  );
}

export default NavigationMenu;
