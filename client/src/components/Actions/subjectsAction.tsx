import { useEffect, useState } from "react";
import { ISubject } from "@/app/globals"; 
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; 
import { handleChange, InfoDisplay } from "@/pages/Settings";
import { getSubjectById } from "@/app/Api/subjects";

function SubjectActions({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (val: boolean) => void;
}) {
  const [subject, setSubject] = useState<ISubject | null>(null); // State to hold subject data

  useEffect(() => {
    const getSubjectDetails = async () => {
      try {
        const subjectData = await getSubjectById(id);
        if ("error" in subjectData) {
          console.error(subjectData.error);
        } else {
          console.log(subjectData)
          setSubject(subjectData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getSubjectDetails();
  }, [id]);

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
            name="Name"
            value={subject?.name || "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            name="Teacher ID"
            value={subject?.teacherId || "N/A"}
            onChange={handleChange}
            edit={false}
          />
          <InfoDisplay
            name="Classes"
            value={subject?.classes.reduce(
              (accumulator, value) =>
                (accumulator += ` ${(accumulator += value.name)}`),
              ""
            ) || "N/A"}
            onChange={handleChange}
            edit={false}
          />
          <InfoDisplay
            name="Days"
            value={subject?.days.reduce(
              (accumulator, value) =>
                (accumulator += ` ${(accumulator += value)}`),
              ""
            ) || "N/A"}
            onChange={handleChange}
            edit={false}
          />
        </div>
        <div className="mt-5 flex gap-5">
          <Button className="bg-myBlue" onClick={() => setOpen(false)}>
            Edit
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
