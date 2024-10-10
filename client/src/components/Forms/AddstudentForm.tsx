import { SelectComponent } from "../custom/SelectComponent";
import Input from "../custom/Input";
import { ChangeEvent } from "react";
import { IStudent } from "@/app/globals";
export const genderOptions = [
  {
    name: "male",
    value: "male",
  },
  {
    name: "female",
    value: "female",
  },
  {
    name: "unknown",
    value: "unknown",
  },
];

export const classOptionsPlaceholder = [
  {
    name: "class A",
    value: "class Id1 ",
  },
  {
    name: "class B",
    value: "class Id2 ",
  },
];

interface addStudentformprops {
  updatefn(e: ChangeEvent<HTMLInputElement>): void;
  state: IStudent;
  handleSelectChange?: (val: string, va2: string) => void;
}

function AddstudentForm({
  updatefn,
  state,
  handleSelectChange,
}: addStudentformprops) {
  return (
    <div className="mt-3  flex gap-10 items-center">
      <Input
        name="firstName"
        label="First name * "
        placeholder="First name  "
        className="border-2 mt-1"
        required={true}
        onChange={updatefn}
        value={state.firstName}
      />
      <Input
        name="lastName"
        label="Last name * "
        placeholder="Last name "
        className="border-2 mt-1"
        required={true}
        onChange={updatefn}
        value={state.lastName}
      />

      <Input
        name="email"
        label="student's email  "
        placeholder="email "
        className="border-2 mt-1"
        onChange={updatefn}
        value={state.email}
      />
      <label className=" flex flex-col gap-2">
        <span className="font-semibold">gender * </span>
        <SelectComponent
          options={genderOptions}
          placeholder="select gender"
          handleSelectChange={(value: string) => {
            if (handleSelectChange) {
              handleSelectChange("classId", value);
            }
          }}
        />
      </label>
      <label className=" flex flex-col gap-2">
        <span className="font-semibold">class * </span>
        <SelectComponent
          options={classOptionsPlaceholder}
          placeholder="select class"
        />
      </label>
    </div>
  );
}

export default AddstudentForm;
