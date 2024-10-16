import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import FeesGroupForm from "../Forms/AddFeesGroupForm";

function AddFeesGroupDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex  font-semibold text-sm gap-1  mr-3 items-center  hover:underline  ">
          <PencilSquareIcon className="h-5" />
          Add fees Group{" "}
        </button>
      </DialogTrigger>
      <DialogContent className="w-8/12 px-10">
       <p className="font-semibold text-lg ">Add fees Group</p>
        <FeesGroupForm />
        <button onClick={() => setOpen(false)}>exit</button>
      </DialogContent>
    </Dialog>
  );
}

export default AddFeesGroupDialog;
