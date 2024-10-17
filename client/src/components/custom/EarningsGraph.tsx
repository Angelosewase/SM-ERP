import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "Week 1",
    totalIncome: 4000,
    totalExpenses: 2400,
    profit: 1600,
  },
  {
    name: "Week 2",
    totalIncome: 3000,
    totalExpenses: 1398,
    profit: 1602,
  },
  {
    name: "Week 3",
    totalIncome: 2000,
    totalExpenses: 980,
    profit: 1020,
  },
  {
    name: "Week 4",
    totalIncome: 2780,
    totalExpenses: 390,
    profit: 2390,
  },
  {
    name: "Week 5",
    totalIncome: 1890,
    totalExpenses: 480,
    profit: 1410,
  },
  {
    name: "Week 6",
    totalIncome: 2390,
    totalExpenses: 380,
    profit: 2010,
  },
  {
    name: "Week 7",
    totalIncome: 3490,
    totalExpenses: 430,
    profit: 3060,
  },
];

const EarningsGraph: React.FC = () => {
  return (
    <ResponsiveContainer width="98%" height="70%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" className="font-semibold" />
        <YAxis className="font-semibold" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="totalIncome"
          stroke="#065f46"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="totalExpenses" stroke="#ff4c4c" />
        <Line type="monotone" dataKey="profit" stroke="#1e40af" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const LegendItem: React.FC<{
  color: string;
  label: string;
  value: string;
}> = ({ label, color, value }) => {
  return (
    <div className="flex flex-col items-center my-3">
      <div className="flex items-center gap-1 -mb-1">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <p className="text-xs text-gray-500 font-semibold">{label}</p>
      </div>
      <p className="font-semibold text-lg">{value}</p>
    </div>
  );
};

export const Legend = () => {
  return (
    <>
      <LegendItem color="bg-green-800" label="Total Income" value="$15,000" />
      <LegendItem color="bg-red-800" label="Total Expenses" value="$5,000" />
      <LegendItem color="bg-blue-800" label="Total Profit" value="$10,000" />
    </>
  );
};

const IncomeGraph = () => {
  return (
    <div className="flex-1 bg-white h-[410px] mt-6 py-3 ">
      <div className="flex justify-between py-0 px-4">
        <p className="p-0 font-bold text-lg">Earnings</p>
        <button>
          <EllipsisHorizontalIcon className="h-6 p-0 text-gray-400" />
        </button>
      </div>
      <div className="mb-2 flex justify-evenly mt-1 item">
        <Legend />
        <div>
          <p className="text-gray-500 mt-2">June 10, 2024</p>
        </div>
      </div>
      <EarningsGraph />
    </div>
  );
};

export default IncomeGraph;