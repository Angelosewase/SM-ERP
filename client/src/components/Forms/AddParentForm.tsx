import Input from "../custom/Input";
import { SelectComponent } from "../custom/SelectComponent";

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
function AddParentForm() {
  return (
    <div className="mt-3  flex gap-8 items-center ">
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
        label="parent's email  "
        placeholder="email "
        className="border-2 mt-1"
        type="email"
      />
      <Input
        name="parentTel"
        label="parent's phone  "
        placeholder="phone number "
        className="border-2 mt-1"
        type="tel"
      />
      <label className=" flex flex-col gap-2">
        <span className="font-semibold">gender * </span>
        <SelectComponent options={genderOptions} placeholder="select gender" />
      </label>
    </div>
  );
}

export default AddParentForm;
