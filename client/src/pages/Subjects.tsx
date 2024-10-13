import { createSubject } from "@/app/Api/subjects";
import { ISubject } from "@/app/globals";
import Header from "@/components/custom/Header";
import AddSubjectForm from "@/components/Forms/AddSubjectForm";
import { SubjectsTable } from "@/components/tables/subjects/table";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

function Subjects() {
  const [formState, setFormState] = useState<ISubject>({
    name: "",
    teacherId: "",
    classes: [],
    days: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: keyof ISubject, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: Array.isArray(prev[field])
        ? [...(prev[field] as string[]), value]
        : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const newSubject = await createSubject(formState);
      if ("error" in newSubject) {
        console.error("Error creating subject:", newSubject.error);
      } else {
        console.log("Subject created successfully:", newSubject);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col flex-1 ">
          <p className="font-bold  mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /<span className="text-myBlue font-semibold">subjects</span>
          </p>
        </div>
        <div className="w-full bg-white mt-6  rounded py-3 px-8 flex flex-col justify-between pb ">
          <SubjectsTable />
        </div>
        <div className="w-full bg-white mt-6  rounded py-3 px-8  ">
          <AddSubjectForm
            state={formState}
            updatefn={handleChange}
            handleSelectChange={handleSelectChange}
          />
          <div className="mt-5">
            <Button className="bg-myBlue" onClick={handleSubmit}>
              create new subject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subjects;
