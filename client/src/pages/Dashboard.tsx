import { schoolSelector } from "@/app/features/schoolSlice";
import IncomeGraph from "@/components/custom/EarningsGraph";
import ExpensesBarGraph from "@/components/custom/ExpensesBarGraph";
import Header from "@/components/custom/Header";
import StudentsPieChart from "@/components/custom/StudentsAttendanceChart";
import {
  CurrencyDollarIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";

function Dashboard() {
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="pb-10">
      <Header />
      <div className="px-6">
        <div className="flex flex-col">
          <p className="font-bold    mt-4">Admin Dashboard</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">Home </p>
        </div>

        <Facts />
        <div className="flex-1 flex gap-6">
          <IncomeGraph />
          <div className="flex-1 flex gap-6 mt-6">
            <ExpensesBarGraph />
            <StudentsPieChart />
          </div>
        </div>
        <div className="flex gap-6 mt-6">
          <div className="flex-1  bg-white flex-col  flex item-center  rounded pb-6 pt-3 ">
            <p className="font-semibold text-lg ml-3 mb-4">Event calendar</p>
            <Calendar
              onChange={onChange}
              value={value}
              className={"w-[90%]  h-[90%] self-center"}
            />
          </div>
          <div className="flex-1 bg-white flex flex-col py-3 ">
            <p className="font-semibold text-lg px-3 ">Reminders</p>
            <div className="self-center  text-gray-600 w-[] justify-self-center my-auto mt-10">
              Guess what ? still working on it
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

interface FactProps {
  color: string; // Optional className for custom styling
  children: React.ReactNode;
  label: string;
  value: string;
}

const Fact: React.FC<FactProps> = ({ color, children, label, value }) => {
  return (
    <div className="bg-white flex gap-6 items-center p-4 h-[85px] rounded shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex-1 ">
      <div className={`p-2 rounded-full ${color} shadow-inner`}>{children}</div>

      <div className="pl-3 border-l-4 border-l-myBlue">
        <p className="text-gray-500 -mb-1">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

const Facts: React.FC = () => {
  const school = useSelector(schoolSelector).school;
  if (!school) {
    console.log("invalid state");
    return (
      <div className="flex mt-4 gap-6 ">
        <div className="bg-white flex gap-6 items-center p-4 h-[85px] rounded shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex-1 opacity-50"></div>
        <div className="bg-white flex gap-6 items-center p-4 h-[85px] rounded shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex-1 opacity-50 "></div>
        <div className="bg-white flex gap-6 items-center p-4 h-[85px] rounded shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex-1 opacity-50"></div>
        <div className="bg-white flex gap-6 items-center p-4 h-[85px] rounded shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex-1 opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="flex mt-4 gap-6">
      <Fact
        color="bg-green-200"
        label="students"
        value={`${school.students?.length}`}
      >
        <UserIcon className="h-10 text-green-800" />
      </Fact>
      <Fact
        color="bg-blue-200"
        label="Teachers"
        value={`${school.teachers?.length}`}
      >
        <UserCircleIcon className="h-10 text-blue-800" />
      </Fact>

      <Fact
        color="bg-yellow-200"
        label="parents"
        value={`${school.teachers?.length}`}
      >
        <UserGroupIcon className="h-10 text-yellow-800" />
      </Fact>

      <Fact color="bg-red-200" label="income" value="$0">
        <CurrencyDollarIcon className="h-10 text-red-800" />
      </Fact>
    </div>
  );
};
