import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";


import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { LegendItem } from "./EarningsGraph";

const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

export  class AttendanceGraph extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}



function StudentsAttendanceChart() {
  return (
    <div className="flex-1 bg-white py-3">
      <div className="flex justify-between py-0 px-4">
        <p className="p-0 font-bold text-lg">Student's attendance</p>
        <button>
          <EllipsisHorizontalIcon className="h-6 p-0 text-gray-400" />
        </button>
      </div>
      <div className="flex justify-center gap-10">
      <CustomLegend />
      </div>
      <AttendanceGraph />
    
    </div>
  );
}

export default StudentsAttendanceChart;


const CustomLegend = () => {
    return (
      <>
        <LegendItem  color="bg-blue-800" label="girls" value="300" />
        <LegendItem color="bg-red-800" label="boys" value="6000" />
      </>
    );
  };
