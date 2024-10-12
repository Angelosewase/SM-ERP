import Header from "@/components/custom/Header";
import AddClassForm from "@/components/Forms/AddClassForm";
import { ClassTable } from "@/components/tables/classes/table";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export interface classCreationI {
  name: string;
  teacherId: string;
  subjects?: string[];
  students?: string[];
}

function Classes() {
  const [classState, setClassState] = useState<classCreationI>({
    name: "",
    teacherId: "",
    subjects: [],
    students: [],
  });
 //for adding classes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClassState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setClassState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col flex-1 ">
          <p className="font-bold  mt-4">classes</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /<span className="text-myBlue font-semibold">classes</span>
          </p>
        </div>
        <div className="w-full bg-white mt-6  rounded py-3 px-8 flex flex-col justify-between pb ">
          <ClassTable />
        </div>
        <div className="w-full bg-white mt-6  rounded py-3 px-8 flex flex-col justify-between pb ">
          <h1 className="text-xl font-semibold">Create new class</h1>
          <div className="flex justify-between items-end">
            <AddClassForm
              state={classState}
              updatefn={handleInputChange}
              handleSelectChange={handleSelectChange}
            />
            <div>
              <Button className="bg-myBlue">create new class</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classes;
