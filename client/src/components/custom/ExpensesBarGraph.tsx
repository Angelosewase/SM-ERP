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

// Sample data for expenses
const data = [
  {
    name: "Rent",
    amount: 1200,
  },
  {
    name: "Utilities",
    amount: 300,
  },
  {
    name: "Groceries",
    amount: 450,
  },
  {
    name: "Transportation",
    amount: 150,
  },
  {
    name: "Entertainment",
    amount: 200,
  },
  {
    name: "Insurance",
    amount: 250,
  },
  {
    name: "Miscellaneous",
    amount: 100,
  },
];

const BarChartExample: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="70%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="amount"
          fill="#0052B4" // Your original color for expenses
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
}> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center my-3">
      <p className="text-xs text-gray-500 font-semibold">{label}</p>
      <p className="font-semibold text-lg">{value}</p>
    </div>
  );
};

export const Legend = () => {
  return (
    <div className="flex justify-evenly">
      <LegendItem label="Total Expenses" value="$3,000" />
      <LegendItem label="Total Budget" value="$5,000" />
      <LegendItem label="Remaining Budget" value="$2,000" />
    </div>
  );
};