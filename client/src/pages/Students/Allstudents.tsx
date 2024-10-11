import { fetchStudents } from "@/app/Api/student";
import Header from "@/components/custom/Header";
import {
  Student,
  StudentTable,
} from "@/components/tables/student/StudentsTable";
import { transformStudentData } from "@/utils/objects";
import { useEffect, useState } from "react";

function Allstudents() {
  const [stateData, setStateData] = useState<Student[]>([]);
  useEffect(() => {
    async function getdata() {
      const data = await fetchStudents();
      const formattedData = transformStudentData(data);
      setStateData(formattedData);
    }
    getdata();
  }, [stateData]);

  return (
    <div className=" pb-3 h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col flex-1 ">
          <p className="font-bold  mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /
            <span className="text-myBlue font-semibold">All students</span>
          </p>
        </div>
        <div className="w-full bg-white mt-6  rounded py-3 px-8 flex flex-col justify-between pb ">
          <StudentTable data={stateData} />
        </div>
      </div>
    </div>
  );
}

export default Allstudents;
