import { genderOptions } from "@/app/Data/defaults";
import Input from "../custom/Input";
import { SelectComponent } from "../custom/SelectComponent";
import { SelectClass } from "../custom/classSelect";
import { ChangeEvent } from "react";
import { ITeacher } from "@/app/globals";
import { SelectSubject } from "../custom/selectSubject";

interface addStudentformprops {
  updatefn(e: ChangeEvent<HTMLInputElement>): void;
  state: ITeacher;
  handleSelectChange: (val: string, val2: string) => void;
  handleMultipleSelectionChange: (array: string[], val: string) => void;
}

function AddteacherForm({
  updatefn,
  state,
  handleSelectChange,
  handleMultipleSelectionChange,
}: addStudentformprops) {
  return (
    <div>
      {" "}
      <div className="mt-3  flex gap-10 items-center  flex-wrap">
        <Input
          name="firstName"
          label="First name * "
          placeholder="First name  "
          className="border-2 mt-1"
          required={true}
          value={state.firstName}
          onChange={updatefn}
        />
        <Input
          name="lastName"
          label="Last name * "
          placeholder="Last name "
          className="border-2 mt-1"
          required={true}
          value={state.lastName}
          onChange={updatefn}
        />

        <Input
          name="email"
          label="teacher's email  "
          placeholder="email "
          className="border-2 mt-1"
          value={state.email}
          onChange={updatefn}
        />
        <label className=" flex flex-col gap-2">
          <span className="font-semibold">gender * </span>
          <SelectComponent
            options={genderOptions}
            placeholder="select gender"
            handleSelectChange={(value) => {
              handleSelectChange("gender", value);
            }}
          />
        </label>
        <label className=" flex flex-col gap-2">
          <span className="font-semibold">select classes * </span>
          <SelectClass
            handleSelectChange={(value: string) => {
              handleMultipleSelectionChange(state.classes, value);
            }}
          />
        </label>
        <label className=" flex flex-col gap-2">
          <span className="font-semibold">select subjects * </span>
          <SelectSubject
            placeholder="select subject"
            handleSelectChange={(value) => {
            handleMultipleSelectionChange(state.subjects, value);
            }}
          />
        </label>
      </div>
    </div>
  );
}

export default AddteacherForm;
