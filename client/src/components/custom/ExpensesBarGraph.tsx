import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

const BarChartExample: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="70%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="pv"
          fill="#0052B4"
          activeBar={<Rectangle fill="#8884d8" stroke="#8884d8" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

function ExpensesBarGraph() {
  return (
    <div className="flex-1 h-[410px] bg-white rounded pt-3 ">
      <div className="flex justify-between py-0 px-4">
        <p className="p-0 font-bold text-lg">Expenses</p>
        <button>
          <EllipsisHorizontalIcon className="h-6 p-0 text-gray-400" />
        </button>
      </div>
      <Legend />
      <BarChartExample />
    </div>
  );
}

export default ExpensesBarGraph;

export const LegendItem: React.FC<{
  label: string;
  value: string;
}> = ({ label,  value }) => {
  return (
    <div className="flex flex-col items-center my-3 ">
      <p className="text-xs  text-gray-500 font-semibold">{label}</p>
      <p className="font-semibold text-lg">{value}</p>

    </div>
  );
};

export const Legend = () => {
  return (
    <div className="flex  justify-evenly">
    
      <LegendItem  label="April 2021" value="$3000" />
      <LegendItem  label="May 2021" value="$5000" />
      <LegendItem  label="June 2023" value="$5000" />
    </div>
  );
};
