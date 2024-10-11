import Header from "@/components/custom/Header";
import AddSubjectForm from "@/components/Forms/AddSubjectForm";
import { SubjectsTable } from "@/components/tables/subjects/table";
import { Button } from "@/components/ui/Button";

function Subjects() {
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
          // state={classState}
          // updatefn={handleInputChange}
          // handleSelectChange={handleSelectChange}
          />
          <div className="mt-5">
            <Button className="bg-myBlue">create new subject</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subjects;
