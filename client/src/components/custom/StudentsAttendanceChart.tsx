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

// Custom attendance data
const attendanceData = [
  {
    name: 'june 10',
    boys : 110, 
    girls: 100, 
    total: 280, 
  },
  {
    name: 'june 11',
    boys : 170, 
    girls: 100, 
    total: 260, 
  },
  {
    name: 'june 12',
    boys : 100, 
    girls: 190, 
    total: 200, 
  },
  {
    name: 'june 13',
    boys : 107, 
    girls: 120, 
    total: 270, 
  },
  {
    name: 'june 14',
    boys : 190, 
    girls: 120, 
    total: 206, 
  },
  {
    name: 'june 17',
    boys: 100,
    girls: 130,
    total: 270,
  },
  {
    name: 'june 18',
    boys: 160,
    pv: 110,
    total: 270,
  },
];

export class AttendanceGraph extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={attendanceData}
            margin={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="total" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="girls" barSize={25} fill="#413ea0" />
            <Line type="monotone" dataKey="boys" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

function StudentsAttendanceChart() {
  return (
    <div className="flex-1 bg-white py-3 rounded shadow-md">
      <div className="flex justify-between py-0 px-4">
        <p className="p-0 font-bold text-lg">Student's Attendance</p>
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
    <div className="flex gap-4">
      <LegendItem color="bg-blue-800" label="Girls" value="300" />
      <LegendItem color="bg-red-800" label="Boys" value="600" />
    </div>
  );
};