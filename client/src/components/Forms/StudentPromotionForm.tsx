import Input from "../custom/Input";
import { SelectComponent } from "../custom/SelectComponent";
import { classOptionsPlaceholder } from "./AddstudentForm";

function StudentPromotionForm() {
  return (
    <div>
      <h1 className="text-xl font-semibold ">Promote student </h1>
      <div className="flex gap-12  mt-6">
        <label className=" flex flex-col gap-2">
          <span className="font-semibold">current class * </span>
          <SelectComponent
            options={classOptionsPlaceholder}
            placeholder="select class"
            handleSelectChange={(val)=> {if(val) return}}
          />
        </label>

        <label className=" flex flex-col gap-2">
          <span className="font-semibold">select student * </span>
          <SelectComponent
            options={classOptionsPlaceholder}
            placeholder="select student"
            handleSelectChange={(val)=> {if(val) return}}
          />
        </label>

        <label className=" flex flex-col gap-2">
          <span className="font-semibold">Promotion class * </span>
          <SelectComponent
            options={classOptionsPlaceholder}
            placeholder="Promotion class"
            handleSelectChange={(val)=> {if(val) return}}
          />
        </label>

        <Input
          name="reason"
          label="reason (optional)"
          placeholder="reason "
          className="border-2 mt-1 w-64"
  
        />
      </div>
      <div className="flex gap-4 mt-8">
        <button className="bg-myBlue w-28 px-4 py-2 text-white font-semibold rounded">
          save
        </button>
        <button className="bg-black px-4 py-2 text-white font-semibold rounded w-28">
          reset
        </button>
      </div>
    </div>
  );
}

export default StudentPromotionForm;
