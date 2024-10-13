import { ChangeEvent } from "react";
import Input from "../custom/Input";
import { classCreationI } from "@/pages/classes";
import { SelectTeacher } from "../custom/selectTeacher";

interface AddClassFormProps {
  updatefn(e: ChangeEvent<HTMLInputElement>): void;
  state?: classCreationI;
  handleSelectChange: (val: string, val2: string) => void;
}

function AddClassForm({
  updatefn,
  state,
  handleSelectChange,
}: AddClassFormProps) {
  return (
    <div className="mt-3 flex gap-10 items-center">
      <Input
        name="name"
        label="Class Name *"
        placeholder="Enter class name"
        className="border-2 mt-1"
        required={true}
        onChange={updatefn}
        value={state?.name}
      />
      <label className="flex flex-col gap-2">
        <span className="font-semibold">Class Teacher *</span>
        <SelectTeacher
          handleSelectChange={(value: string) => {
            handleSelectChange("teacherId", value);
          }}
        />
      </label>
    </div>
  );
}

export default AddClassForm;
