import { useEffect, useState } from "react";
import { ISubject } from "@/app/globals";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getSubjectById, updateSubject } from "@/app/Api/subjects";
import InfoDisplay from "../custom/InfoDisplay";

function SubjectActions({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (val: boolean) => void;
}) {
  const [subject, setSubject] = useState<ISubject | null>(null);
  const [updatstate, setUpdateState] = useState<Partial<ISubject>>({
    name: "",
  });

  function handleChange(val: string | Date, name: string) {
    if (val === "") return;
    setUpdateState((prev) => ({ ...prev, [name]: val }));
  }

  useEffect(() => {
    const getSubjectDetails = async () => {
      try {
        const subjectData = await getSubjectById(id);
        if ("error" in subjectData) {
          console.error(subjectData.error);
        } else {
          console.log(subjectData);
          setSubject(subjectData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getSubjectDetails();
  }, [id]);

  const handleSave = async () => {
    if (!subject?._id) return;

    try {
      const updatedStudent = await updateSubject(subject?._id, updatstate);
      console.log("Student updated successfully:", updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="px-2 hover:cursor-default hover:bg-slate-50 py-1 rounded">
          View Details
        </p>
      </DialogTrigger>
      <DialogContent className="w-[900px]">
        <h1 className="font-semibold text-lg">Subject Details</h1>
        <div className="mt-auto">
          <div className="flex gap-10 items-center">
            <div className="text-gray-500 font-semibold">
              Subject ID: <span className="font-mono text-black">{id}</span>
            </div>
          </div>

          <InfoDisplay
            label="name"
            name="name"
            value={subject?.name || "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            name="teacherId"
            value={
              subject?.teacherId.firstName +
                " " +
                subject?.teacherId.lastName || "N/A"
            }
            label="teacher id "
            onChange={handleChange}
            edit={false}
          />
          <InfoDisplay
            name="Classes"
            label="class"
            value={
              subject?.classes.reduce(
                (accumulator, value) =>
                  (accumulator += ` ${(accumulator += value.name)}`),
                ""
              ) || "N/A"
            }
            onChange={handleChange}
            edit={false}
          />
          <InfoDisplay
            label="Days"
            name="Days"
            value={
              subject?.days.reduce(
                (accumulator, value) =>
                  (accumulator += ` ${(accumulator += value)}`),
                ""
              ) || "N/A"
            }
            onChange={handleChange}
            edit={false}
          />
        </div>
        <div className="mt-5 flex gap-5">
          <Button className="bg-myBlue" onClick={() =>handleSave()}>
            save
          </Button>
          <Button
            className="w-20"
            onClick={() => setOpen(false)}
            variant={"destructive"}
          >
            Exit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SubjectActions;
