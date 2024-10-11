import { genderOptions } from "@/app/Data/defaults";
import Input from "../custom/Input";
import { SelectComponent } from "../custom/SelectComponent";
import { classOptionsPlaceholder } from "./AddstudentForm";

function AddteacherForm() {
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
          label="teacher's email  "
          placeholder="email "
          className="border-2 mt-1"
        />
        <label className=" flex flex-col gap-2">
          <span className="font-semibold">gender * </span>
          <SelectComponent
            options={genderOptions}
            placeholder="select gender"
          />
        </label>
        <label className=" flex flex-col gap-2">
          <span className="font-semibold">select classes * </span>
          <SelectComponent
            options={classOptionsPlaceholder}
            placeholder="select class"
          />
        </label>
        <label className=" flex flex-col gap-2">
          <span className="font-semibold">select subjects * </span>
          <SelectComponent
            options={classOptionsPlaceholder}
            placeholder="select subject"
          />
        </label>
      </div>
    </div>
  );
}

export default AddteacherForm;
