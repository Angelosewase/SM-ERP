import { createParent } from "@/app/Api/parent";
import { createStudent } from "@/app/Api/student";
import { IParent, IStudent } from "@/app/globals";
import Header from "@/components/custom/Header";
import AddParentForm from "@/components/Forms/AddParentForm";
import AddstudentForm from "@/components/Forms/AddstudentForm";
import { useState } from "react";

function AddStudent() {
  const [studentState, setStudentState] = useState<IStudent>({
    classId: "",
    firstName: "",
    lastName: "",
    gender: "unknown",
    email: "",
  });

  const [parenstState, setParentState] = useState<IParent>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    child: "",
    gender: "",
  });

  function updateStundentStateValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setStudentState({ ...studentState, [name]: value });
  }

  function updateParentStateValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setParentState({ ...parenstState, [name]: value });
  }

  function handleStudentSelectChange(name: string, value: string) {
    setStudentState({ ...studentState, [name]: value });
  }
  function handleParentSelectChange(name: string, value: string) {
    setParentState({ ...parenstState, [name]: value });
  }

  async function handleSubmit() {
    console.log("student", studentState);
    console.log("parent", parenstState);
    try {
      const createdStudent = await createStudent(studentState);
      if (!createdStudent._id) {
        console.log("Creation of user failed");
        return;
      }

      const parent = await createParent({
        ...parenstState,
        child: createdStudent._id,
      });

      if(parent._id){
        console.log("student created successfully")
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
    resetStates()
  }


  const resetStates = () => {
    setStudentState({
      classId: "",
      firstName: "",
      lastName: "",
      gender: "unknown",
      email: "",
    });
  
    setParentState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      child: "",
      gender: "",
    });
  };

  return (
    <div className="h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col">
          <p className="font-bold  mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /
            <span className="text-myBlue font-semibold">Register student</span>
          </p>
        </div>

        <div className="h-[75vh] w-full bg-white mt-6  rounded py-3 px-4 flex flex-col justify-between pb-10">
          <div>
            <h1 className="text-xl font-semibold ">Add new student </h1>
            <AddstudentForm
              state={studentState}
              updatefn={updateStundentStateValue}
              handleSelectChange={handleStudentSelectChange}
            />
          </div>
          <div className="">
            <h1 className="text-xl font-semibold">
              Register parent/guardian details{" "}
            </h1>
            <AddParentForm
              state={parenstState}
              updatefn={updateParentStateValue}
              handleSelectChange={handleParentSelectChange}
            />
          </div>

          <div className="">
            <div className="flex gap-4 items-end mb-8">
              <div className=" w-40 h-40 rounded-full bg-gray-200"></div>
              <div>
                <p>upload student photo (150px by 150px)</p>
                <input
                  type="file"
                  name="studentPhoto"
                  className="text-sm mb-6 "
                />
              </div>
            </div>
            <div className="flex gap-4" onClick={handleSubmit}>
              <button className="bg-myBlue w-28 px-4 py-1 text-white font-semibold rounded">
                save
              </button>
              <button className="bg-black px-4 py-1 text-white font-semibold rounded w-28" onClick={resetStates}>
                reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
