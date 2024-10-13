import { fetchStudentById } from "@/app/Api/student";
import { IStudent } from "@/app/globals";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { handleChange, InfoDisplay } from "@/pages/Settings";
import { useEffect, useState } from "react";

function StudentActions({
  id,
  setState,
}: {
  id: string;
  setState: (val: boolean) => void;
}) {
  const [student, setStudent] = useState<IStudent | null>(null); // State to hold student data

  useEffect(() => {
    const getStudentDetails = async () => {
      try {
        const studentData = await fetchStudentById(id);
        setStudent(studentData);
      } catch (err) {
        console.error(err);
      }
    };

    getStudentDetails();
  }, [id]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <p className="px-2 hover:cursor-default hover:bg-slate-50 py-1 rounded">
            view details
          </p>
        </DialogTrigger>
        <DialogContent className="w-[900px] ">
          <h1 className="font-semibold text-lg">Student details</h1>
          <div className="  mt-auto ">
            <div className="flex gap-10 items-center">
              <div className="w-32 h-32 bg-gray-50 rounded-full "></div>
              <div className="text-gray-500 font-semibold">
                student id : <span className="font-mono  text-black">{id}</span>
              </div>
            </div>

            <InfoDisplay
              name="first name"
              value={student?.firstName || "username"}
              onChange={handleChange}
            />

            <InfoDisplay
              name="last name"
              value={student?.lastName || "username"}
              onChange={handleChange}
            />
            <InfoDisplay
              name="gender"
              value={student?.gender || "gender"}
              onChange={handleChange}
            />
            <InfoDisplay
              name="class"
              value={student?.classId.name || "username"}
              onChange={handleChange}
              edit={false}
            />
            <InfoDisplay
              name="fees status"
              value="paid"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5 flex gap-5">
            <Button className="bg-myBlue" onClick={() => setState(false)}>
              Edit
            </Button>
            <Button
              className=" w-20"
              onClick={() => setState(false)}
              variant={"destructive"}
            >
              exit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentActions;
