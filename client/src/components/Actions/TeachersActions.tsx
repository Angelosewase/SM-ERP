import { ITeacher } from "@/app/globals";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import InfoDisplay from "../custom/InfoDisplay";
import { fetchTeacherById, updateTeacher } from "@/app/Api/teachers";

function TeacherActions({
  id,
  setState,
}: {
  id: string;
  setState: (val: boolean) => void;
}) {
  const [teacher, setTeacher] = useState<ITeacher | null>(null);
  const [updateTeacherState, setUpdateTeacherState] = useState<
    Partial<ITeacher>
  >({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  const isUpdateTeacherStateEmpty = (state: Partial<ITeacher>): boolean => {
    return Object.values(state).every((value) => value === "");
  };

  const handleSave = async () => {
    if (isUpdateTeacherStateEmpty(updateTeacherState)) {
      console.error("All fields are empty. Cannot update the teacher.");
      return;
    }
    try {
      if (!teacher?._id) return;
      const updatedTeacher = await updateTeacher(
        teacher._id,
        updateTeacherState
      );
      console.log("Teacher updated successfully:", updatedTeacher);
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  function handleChange(val: string | Date, name: string) {
    if (val === "") return;
    setUpdateTeacherState((prev) => ({ ...prev, [name]: val }));
  }

  const getTeacherDetails = async () => {
    try {
      const teacherData = await fetchTeacherById(id);
      if (!teacherData) return;
      setTeacher(teacherData);
      setUpdateTeacherState({
        firstName: teacherData.firstName,
        lastName: teacherData.lastName,
        email: teacherData.email,
        gender: teacherData.gender,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTeacherDetails();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="px-2 hover:cursor-default hover:bg-slate-50 py-1 rounded">
          View Details
        </p>
      </DialogTrigger>
      <DialogContent className="w-[900px]">
        <h1 className="font-semibold text-lg">Teacher Details</h1>
        <div className="mt-auto">
          <div className="flex gap-10 items-center">
            <div className="w-32 h-32 bg-gray-50 rounded-full"></div>
            <div className="text-gray-500 font-semibold">
              Teacher ID: <span className="font-mono text-black">{id}</span>
            </div>
          </div>

          <InfoDisplay
            name="firstName"
            label="First Name"
            value={teacher?.firstName || "N/A"}
            onChange={handleChange}
          />

          <InfoDisplay
            name="lastName"
            label="Last Name"
            value={teacher?.lastName || "N/A"}
            onChange={handleChange}
          />

          <InfoDisplay
            name="email"
            label="Email"
            value={teacher?.email || "N/A"}
            onChange={handleChange}
          />

          <InfoDisplay
            name="gender"
            label="Gender"
            value={teacher?.gender || "N/A"}
            onChange={handleChange}
          />

          <InfoDisplay
            label="Subjects"
            name="subjects"
            value={teacher?.subjects.reduce(
                (accumulator, value) =>
                  (accumulator += ` ${(accumulator += value.name)}`),
                ""
              )  || "N/A"}
            edit={false}
            onChange={handleChange}
          />

          <InfoDisplay
            label="Classes"
            name="classes"
            value={teacher?.classes.reduce(
                (accumulator, value) =>
                  (accumulator += ` ${(accumulator += value.name)}`),
                ""
              )  || "N/A"}
            edit={false}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5 flex gap-5">
          <Button
            className="bg-myBlue"
            onClick={() => handleSave()}
            disabled={isUpdateTeacherStateEmpty(updateTeacherState)}
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

export default TeacherActions;
