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
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
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
          dataKey="pv"
          stroke="#065f46"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#1e40af" />
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
      <div className="flex items-center    gap-1 -mb-1">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <p className="text-xs  text-gray-500 font-semibold">{label}</p>
      </div>
      <p className="font-semibold text-lg">{value}</p>
    </div>
  );
};
export const Legend = () => {
  return (
    <>
      <LegendItem color="bg-blue-800" label="total collections" value="$3000" />
      <LegendItem color="bg-red-800" label="total fees" value="$5000" />
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
          <p className="text-gray-500 mt-2">June 10, 2024 </p>
        </div>
      </div>
      <EarningsGraph />
    </div>
  );
};

export default IncomeGraph;
