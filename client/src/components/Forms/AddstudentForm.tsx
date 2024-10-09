import { SelectComponent } from "../custom/SelectComponent";
import Input from "../custom/Input";
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

export const classOptionsPlaceholder = [
  {
    name: "class A",
    value: "class Id ",
  },
  {
    name: "class B",
    value: "class Id ",
  },
];

function AddstudentForm() {
  return (
    <div className="mt-3  flex gap-10 items-center">
      <Input
        name="firstName"
        label="First name * "
        placeholder="First name  "
        className="border-2 mt-1"
        required={true}
      />
      <Input
        name="lastName"
        label="Last name * "
        placeholder="Last name "
        className="border-2 mt-1"
        required={true}
      />

      <Input
        name="email"
        label="student's email  "
        placeholder="email "
        className="border-2 mt-1"
      />
      <label className=" flex flex-col gap-2">
        <span className="font-semibold">gender * </span>
        <SelectComponent options={genderOptions} placeholder="select gender" />
      </label>
      <label className=" flex flex-col gap-2">
        <span className="font-semibold">class * </span>
        <SelectComponent options={classOptionsPlaceholder} placeholder="select class" />
      </label>
    </div>
  );
}

export default AddstudentForm;
