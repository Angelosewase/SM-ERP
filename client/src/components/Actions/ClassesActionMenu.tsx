import { fetchClassById } from "@/app/Api/classes";
import { IClass } from "@/app/globals"; // Assuming this is the correct import for your IClass interface
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { handleChange, InfoDisplay } from "@/pages/Settings";
import { useEffect, useState } from "react";

function ClassMenuActions({
  id,
  setState,
}: {
  id: string;
  setState: (val: boolean) => void;
}) {
  const [classDetails, setClassDetails] = useState<IClass | null>(null); // State to hold class data

  useEffect(() => {
    const getClassDetails = async () => {
      try {
        const classData = await fetchClassById(id); // Fetch class data by ID
        setClassDetails(classData);
      } catch (err) {
        console.error(err);
      }
    };

    getClassDetails();
  }, [id]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <p className="px-2 hover:cursor-default hover:bg-slate-50 py-1 rounded">
            view  details
          </p>
        </DialogTrigger>
        <DialogContent className="w-[900px] ">
          <h1 className="font-semibold text-lg">Class details</h1>
          <div className="mt-auto">
            <div className="flex gap-10 items-center">
              <div className="w-32 h-32 bg-gray-50 rounded-full "></div>
              <div className="text-gray-500 font-semibold">
                Class ID: <span className="font-mono text-black">{id}</span>
              </div>
            </div>

            <InfoDisplay
              name="Class Name"
              value={classDetails?.name || "Class Name"}
              onChange={handleChange} // Implement your update logic here
            />
            
            <InfoDisplay
              name="Students Count"
              value={`${classDetails?.students?.length || 0}`}
              onChange={handleChange} 
            />

            <InfoDisplay
              name="Subjects"
              value={classDetails?.subjects?.join(", ") || "No Subjects"}
              onChange={handleChange} // Implement your update logic here
            />

            <InfoDisplay
              name="School ID"
              value={classDetails?.schoolId || "N/A"}
              onChange={handleChange} // Implement your update logic here
            />
          </div>
          <div className="mt-5 flex gap-5">
            <Button className="bg-myBlue" onClick={() => setState(false)}>
              Edit
            </Button>
            <Button
              className="w-20"
              onClick={() => setState(false)}
              variant={"destructive"}
            >
              Exit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ClassMenuActions;
