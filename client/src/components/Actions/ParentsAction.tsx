import { useEffect, useState } from "react";
import { fetchParentById, updateParent } from "@/app/Api/parent";
import { IParent } from "@/app/globals";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import InfoDisplay from "../custom/InfoDisplay";

function ParentActions({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (val: boolean) => void;
}) {
  const [parent, setParent] = useState<IParent | null>(null);
  const [editParent, setEditParent] = useState<Partial<IParent>>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
  });
  const isUpdateStateEmpty = (state: Partial<IParent>): boolean => {
    return Object.values(state).every((value) => value === "");
  };

  const handleSave = async () => {
    if (isUpdateStateEmpty(editParent)) {
      console.error("All fields are empty. Cannot update the student.");
      return;
    }
    try {
      if (!parent?._id) return;
      await updateParent(parent?._id, editParent);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleEditChange = (val: string, value: string) => {
    if (val === "") return;
    setEditParent((prev) => ({ ...prev, [value]: val }));
  };

  useEffect(() => {
    const getParentDetails = async () => {
      try {
        const parentData = await fetchParentById(id);
        setParent(parentData);
      } catch (err) {
        console.error(err);
      }
    };

    getParentDetails();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="px-2 hover:cursor-default hover:bg-slate-50 py-1 rounded">
          View Details
        </p>
      </DialogTrigger>
      <DialogContent className="w-[900px]">
        <h1 className="font-semibold text-lg">Parent Details</h1>
        <div className="mt-auto">
          <div className="flex gap-10 items-center">
            <div className="w-32 h-32 bg-gray-50 rounded-full"></div>
            <div className="text-gray-500 font-semibold">
              Parent ID: <span className="font-mono text-black">{id}</span>
            </div>
          </div>

          <InfoDisplay
            name="firstName"
            label="First name"
            value={parent?.firstName || "N/A"}
            onChange={handleEditChange}
          />
          <InfoDisplay
            label=" Last name"
            name="lastName"
            value={parent?.lastName || "N/A"}
            onChange={handleEditChange}
          />
          <InfoDisplay
            label="Email"
            name="email"
            value={parent?.email || "N/A"}
            onChange={handleEditChange}
          />
          <InfoDisplay
            label="Tel"
            name="phoneNumber"
            value={parent?.phoneNumber || "N/A"}
            onChange={handleEditChange}
          />
          <InfoDisplay
            label="gender"
            name="gender"
            value={parent?.gender || "N/A"}
            onChange={handleEditChange}
          />
        </div>
        <div className="mt-5 flex gap-5">
          <Button
            className="bg-myBlue"
            onClick={() => {
              handleSave();
              setOpen(false);
            }}
          >
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

export default ParentActions;
