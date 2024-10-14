import { useEffect, useState } from "react";
import { fetchParentById } from "@/app/Api/parent"; 
import { IParent } from "@/app/globals"; 
import { Button } from "@/components/ui/Button"; 
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; 
import { handleChange, InfoDisplay } from "@/pages/Settings"; 

function ParentActions({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (val: boolean) => void;
}) {
  const [parent, setParent] = useState<IParent | null>(null); // State to hold parent data

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
            name="First Name"
            value={parent?.firstName || "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            name="Last Name"
            value={parent?.lastName || "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            name="Email"
            value={parent?.email || "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            name="Tel"
            value={parent?.phoneNumber || "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            name="Gender"
            value={parent?.gender || "N/A"}
            onChange={handleChange}
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

export default ParentActions;
