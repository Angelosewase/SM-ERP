import { ChangeEvent } from "react";
import Input from "../custom/Input";
import { SelectComponent } from "../custom/SelectComponent";
import { IParent } from "@/app/globals";

const genderOptions = [
  {
    name: "male",
    value: "male",
  },
  {
    name: "female",
    value: "female",
  },
];

interface addParentformprops {
  updatefn(e: ChangeEvent<HTMLInputElement>): void;
  state: IParent;
  handleSelectChange?: (val: string, val2: string) => void;
}
function AddParentForm({
  updatefn,
  state,
  handleSelectChange,
}: addParentformprops) {
  return (
    <div className="mt-3  flex gap-8 items-center ">
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
        label="parent's email  "
        placeholder="email "
        className="border-2 mt-1"
        type="email"
        onChange={updatefn}
        value={state.email}
      />
      <Input
        name="phoneNumber"
        label="parent's phone  "
        placeholder="phone number "
        className="border-2 mt-1"
        type="tel"
        onChange={updatefn}
        value={state.phoneNumber}
      />
      <label className=" flex flex-col gap-2">
        <span className="font-semibold">gender * </span>
        <SelectComponent
          options={genderOptions}
          placeholder="select gender"
          handleSelectChange={(value: string) => {
            if (handleSelectChange) {
              handleSelectChange("gender", value);
            }
          }}
        />
      </label>
    </div>
  );
}

export default AddParentForm;
