import { fetchStudentById, updateStudent } from "@/app/Api/student";
import { IStudent } from "@/app/globals";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import InfoDisplay from "../custom/InfoDisplay";
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { runCompleteProcess, runFailProcess } from "@/app/features/proccesThunk";

function StudentActions({
  id,
  setState,
}: {
  id: string;
  setState: (val: boolean) => void;
}) {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [updateStudentState, setUpdateStudentState] = useState<
    Partial<IStudent>
  >({
    firstName: "",
    lastName: "",
    gender: "",
  });

  const dispatch = useDispatch<AppDispatch>()

  const isUpdateStudentStateEmpty = (state: Partial<IStudent>): boolean => {
    return Object.values(state).every((value) => value === "");
  };

  const handleSave = async () => {
    if (isUpdateStudentStateEmpty(updateStudentState)) {
      dispatch(runFailProcess("please enter some data to update"))
      return;
    }
    try {
      if (!student?._id) return;
      await updateStudent(
        student?._id,
        updateStudentState
      );
      dispatch(runCompleteProcess("student updated successfully"))
    } catch (error) {
      console.error("Error updating student:", error);
      dispatch(runFailProcess("error updating student"))
    }

    
  };

  function handleChange(val: string |Date, name: string) {
    if (val === "") return;
    setUpdateStudentState((prev) => ({ ...prev, [name]: val }));
  }

  const getStudentDetails = async () => {
    try {
      const studentData = await fetchStudentById(id);
      setStudent(studentData);
      setUpdateStudentState({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        gender: studentData.gender,
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getStudentDetails();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="px-2 hover:cursor-default hover:bg-slate-50 py-1 rounded">
          View Details
        </p>
      </DialogTrigger>
      <DialogContent className="w-[900px]">
        <h1 className="font-semibold text-lg">Student Details</h1>
        <div className="mt-auto">
          <div className="flex gap-10 items-center">
            <div className="w-32 h-32 bg-gray-50 rounded-full"></div>
            <div className="text-gray-500 font-semibold">
              Student ID: <span className="font-mono text-black">{id}</span>
            </div>
          </div>

          <InfoDisplay
            name="firstName"
            label="First Name"
            value={student?.firstName || "N/A"}
            onChange={handleChange}
          />

          <InfoDisplay
            name="lastName"
            label="Last Name"
            value={student?.lastName || "N/A"}
            onChange={handleChange}
          />

          <InfoDisplay
            name="gender"
            label="Gender"
            value={student?.gender || "N/A"}
            onChange={handleChange}
          />
             <InfoDisplay
            name="email"
            label="email"
            value={student?.email || "N/A"}
            onChange={handleChange}
          />

          <InfoDisplay
            label="Class"
            name="class"
            value={student?.classId?.name || "N/A"}
            onChange={handleChange}
            edit={false}
          />

          <InfoDisplay
            name="feesStatus"
            label="Fees Status"
            value="Paid"
            onChange={handleChange}
            edit={false}
          />
        </div>

        <div className="mt-5 flex gap-5">
          <Button
            className="bg-myBlue"
            onClick={() => handleSave()}
            disabled={isUpdateStudentStateEmpty(updateStudentState)}
          >
            Save
          </Button>
          <Button className="w-20" onClick={() => setState(false)}>
            Exit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StudentActions;
