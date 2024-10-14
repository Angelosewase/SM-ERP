// @ts-nocheck
import { fetchClassById } from "@/app/Api/classes";
import { IClass } from "@/app/globals";
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
  const [classDetails, setClassDetails] = useState<IClass | null>(null);

  useEffect(() => {
    const getClassDetails = async () => {
      try {
        const classData = await fetchClassById(id);
        setClassDetails(classData);
      } catch (err) {
        console.error(err);
      }
    };

    getClassDetails();
  });
  console.log(classDetails);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <p className="px-2 hover:cursor-default hover:bg-slate-50 py-1 rounded">
            view details
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
              onChange={handleChange} 
            />

            <InfoDisplay
              name="Students"
              value={`${classDetails?.students?.length || 0}`}
              onChange={handleChange}
              edit={false}
            />

            <InfoDisplay
              name="Subjects"
              value={
                classDetails?.subjects?.reduce(
                  (accumulator, value) =>
                    (accumulator += ` ${(accumulator += value.name)}`),
                  ""
                ) || "No Subjects"
              }
              onChange={handleChange} 
              edit={false}
            />

            <InfoDisplay
              name="School ID"
              value={classDetails?.schoolId.name || "N/A"}
              onChange={handleChange}
              edit={false}
            />

            <InfoDisplay
              name="Created at"
              value={
                classDetails?.createdAt
                  ? new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(new Date(classDetails.createdAt))
                  : "N/A"
              }
              onChange={handleChange}
              edit={false}
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
