// import { fetchFeeGroupById, updateFeeGroup } from "@/app/Api/feeGroup";
import { IFeeGroup } from "@/app/globals";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import InfoDisplay from "../custom/InfoDisplay";
// import { AppDispatch } from "@/app/store";
// import { useDispatch } from "react-redux";
// import { runCompleteProcess, runFailProcess } from "@/app/features/processThunk";

function FeeGroupsActions({
  id,
  setState,
}: {
  id: string;
  setState: (val: boolean) => void;
}) {
  const [feeGroup] = useState<IFeeGroup | null>(null);
  const [updateFeeGroupState, setUpdateFeeGroupState] = useState<Partial<IFeeGroup>>({
    name: "",
    description: "",
  });

//   const dispatch = useDispatch<AppDispatch>();

  const isUpdateFeeGroupStateEmpty = (state: Partial<IFeeGroup>): boolean => {
    return Object.values(state).every((value) => value === "");
  };

  const handleSave = async () => {
//     if (isUpdateFeeGroupStateEmpty(updateFeeGroupState)) {
//       dispatch(runFailProcess("Please enter some data to update"));
//       return;
//     }
//     try {
//       if (!feeGroup?._id) return;
//       await updateFeeGroup(feeGroup._id, updateFeeGroupState);
//       dispatch(runCompleteProcess("Fee group updated successfully"));
//     } catch (error) {
//       console.error("Error updating fee group:", error);
//       dispatch(runFailProcess("Error updating fee group"));
//     }
  };

  function handleChange(val: string | Date, name: string) {
    if (val === "") return;
    setUpdateFeeGroupState((prev) => ({ ...prev, [name]: val }));
  }

  const getFeeGroupDetails = async () => {
    // try {
    //   const feeGroupData = await fetchFeeGroupById(id);
    //   setFeeGroup(feeGroupData);
    //   setUpdateFeeGroupState({
    //     name: feeGroupData.name,
    //     description: feeGroupData.description,
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  useEffect(() => {
    getFeeGroupDetails();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="px-2 hover:cursor-default hover:bg-slate-50 py-1 rounded">
          View Details
        </p>
      </DialogTrigger>
      <DialogContent className="w-[900px]">
        <h1 className="font-semibold text-lg">Fee Group Details</h1>
        <div className="mt-auto">
          <div className="flex gap-10 items-center">
            <div className="w-32 h-32 bg-gray-50 rounded-full"></div>
            <div className="text-gray-500 font-semibold">
              Fee Group ID: <span className="font-mono text-black">{id}</span>
            </div>
          </div>

          <InfoDisplay
            name="name"
            label="Name"
            value={feeGroup?.name || "N/A"}
            onChange={handleChange}
          />

          <InfoDisplay
            name="description"
            label="Description"
            value={feeGroup?.description || "N/A"}
            onChange={handleChange}
          />

          <InfoDisplay
            name="schoolId"
            label="School ID"
            value={feeGroup?.schoolId || "N/A"}
            onChange={handleChange}
            edit={false}
          />

          <InfoDisplay
            name="createdAt"
            label="Created At"
            value={feeGroup?.createdAt ? new Date(feeGroup.createdAt).toLocaleString() : "N/A"}
            onChange={handleChange}
            edit={false}
          />

          <InfoDisplay
            name="updatedAt"
            label="Updated At"
            value={feeGroup?.updatedAt ? new Date(feeGroup.updatedAt).toLocaleString() : "N/A"}
            onChange={handleChange}
            edit={false}
          />
        </div>

        <div className="mt-5 flex gap-5">
          <Button
            className="bg-myBlue"
            onClick={() => handleSave()}
            disabled={isUpdateFeeGroupStateEmpty(updateFeeGroupState)}
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
export default FeeGroupsActions;