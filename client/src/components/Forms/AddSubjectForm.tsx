// import { ChangeEvent } from "react";
import Input from "../custom/Input";
import { SelectComponent } from "../custom/SelectComponent";
// import { classCreationI } from "@/pages/classes";

export const classOptionsPlaceholder = [
  {
    name: "teacher A",
    value: "teaceherA_Id",
  },
  {
    name: "teacher B",
    value: "teacherb_Id",
  },
];

// interface AddClassFormProps {
//   updatefn(e: ChangeEvent<HTMLInputElement>): void;
//   state?: ;
//   handleSelectChange: (val: string, val2: string) => void;
// }

function AddSubjectForm() {
  return (
    <div className="mt-3 flex gap-10 items-center">
      <Input
        name="name"
        label="subject Name *"
        placeholder="Enter subject name"
        className="border-2 mt-1"
        required={true}
        // onChange={updatefn}
        // value={state?.name}
      />
      <label className="flex flex-col gap-2">
        <span className="font-semibold"> select Teacher *</span>
        <SelectComponent
          options={classOptionsPlaceholder}
          placeholder="Select class teacher"
          handleSelectChange={(value: string) => {
            console.log("teacherId", value);
          }}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-semibold">select  days</span>
        <SelectComponent
          options={classOptionsPlaceholder}
          placeholder="Select days teacher"
          handleSelectChange={(value: string) => {
            console.log("days", value);
          }}
        />
      </label>
    </div>
  );
}

export default AddSubjectForm;
