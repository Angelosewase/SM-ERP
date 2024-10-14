import { fetchClassById, updateClass } from "@/app/Api/classes";
import { IClass } from "@/app/globals";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import InfoDisplay from "../custom/InfoDisplay";

function ClassMenuActions({
  id,
  setState,
}: {
  id: string;
  setState: (val: boolean) => void;
}) {
  const [classDetails, setClassDetails] = useState<IClass | null>(null);
  const [updateState, setUpdateState] = useState<Partial<IClass>>({
    name: "",
  });

  const isUpdateStudentStateEmpty = (state: Partial<IClass>): boolean => {
    return Object.values(state).every((value) => value === "");
  };
  const getClassDetails = async () => {
    try {
      const classData = await fetchClassById(id);
      setClassDetails(classData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClassDetails();
  });

  function handleChange(val: string, name: string) {
    if (val === "") return;
    setUpdateState((prev) => ({ ...prev, [name]: val }));
  }

  const handleSave = async () => {
    if (isUpdateStudentStateEmpty(updateState)) {
      console.error("All fields are empty. Cannot update the student.");
      return;
    }
    try {
      if (!classDetails?._id) return;
      await updateClass(classDetails._id, updateState);
    } catch (error) {
      console.error("Error updating student:", error);
    }
    getClassDetails();
    setState(false);
  };

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
              name="name"
              label="Class Name"
              value={classDetails?.name || "Class Name"}
              onChange={handleChange}
            />

            <InfoDisplay
              name="Students"
              label="Students"
              value={`${classDetails?.students?.length || 0}`}
              onChange={handleChange}
              edit={false}
            />

            <InfoDisplay
              name="Subjects"
              label="Subjects"
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
              label="School ID"
              name="School ID"
              value={classDetails?.schoolId.name || "N/A"}
              onChange={handleChange}
              edit={false}
            />

            <InfoDisplay
              label="label"
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
            <Button className="bg-myBlue" onClick={() => handleSave()}>
              save
            </Button>
            <Button className="w-20" onClick={() => setState(false)}>
              Exit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ClassMenuActions;
