import { ChangeEvent} from "react";
import { ISubject } from "@/app/globals"; // Adjust this import as needed
import Input from "../custom/Input";
import { SelectComponent } from "../custom/SelectComponent";
import { SelectTeacher } from "../custom/selectTeacher";
import { SelectClass } from "../custom/classSelect";

export const classOptionsPlaceholder = [
  { name: "Monday", value: "Monday" },
  { name: "Tuesday", value: "Tuesday" },
  { name: "Wednesday", value: "Wednesday" },
  { name: "Thursday", value: "Thursday" },
  { name: "Friday", value: "Friday" },
  { name: "Saturday", value: "Saturday" },
  { name: "Sunday", value: "Sunday" },
];


interface addSubjectformprops {
  updatefn(e: ChangeEvent<HTMLInputElement>): void;
  state: ISubject;
  handleSelectChange: (field: keyof ISubject, value: string) => void;
}

function AddSubjectForm({updatefn, state, handleSelectChange}:addSubjectformprops) {
  
  return (
    <div className="mt-3 flex gap-10 items-center">
      <Input
        name="name"
        label="Subject Name *"
        placeholder="Enter subject name"
        className="border-2 mt-1"
        required={true}
        value={state.name}
        onChange={updatefn}
      />

      {/* Teacher Select */}
      <label className="flex flex-col gap-2">
        <span className="font-semibold">Select Teacher *</span>
        <SelectTeacher
          placeholder="Select class teacher"
          handleSelectChange={(value: string) => {
            handleSelectChange("teacherId", value);
          }}
        />
      </label>

      {/* Days Select */}
      <label className="flex flex-col gap-2">
        <span className="font-semibold">Select Days</span>
        <SelectComponent
          options={classOptionsPlaceholder}
          placeholder="Select days"
          handleSelectChange={(value: string) => {
            handleSelectChange("days", value);
          }}
          
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-semibold">Select Class</span>
        <SelectClass
          handleSelectChange={(value: string) => {
            handleSelectChange("classes", value);
          }}
        />
      </label>
    </div>
  );
}

export default AddSubjectForm;
