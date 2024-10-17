import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { IFeeGroup } from "@/app/globals";
import Input from "../custom/Input";
import { runCompleteProcess, runFailProcess } from "@/app/features/proccesThunk";
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { createFeeGroup } from "@/app/Api/FeesGroup";
type FeesGroupFormProps = {
  onSubmit?: (data: Omit<IFeeGroup, "id">) => void;
};

const FeesGroupForm: React.FC<FeesGroupFormProps> = () => {
  const [formstate, setfomstate] = useState<Partial<IFeeGroup>>({
    name: "",
    description: "",
    amount: undefined,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "amount") {
      setfomstate({ ...formstate, [name]: parseFloat(value) });
      return;
    }
    setfomstate({ ...formstate, [name]: value });
  }

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formstate.name) {
      dispatch(runFailProcess("all fields are required"));
      return;
    }

    try {
      const createfeesgroup = await createFeeGroup(formstate);
      if (!createfeesgroup) {
        dispatch(runFailProcess("failed to create fees group"));
        return;
      }

      dispatch(runCompleteProcess("fees group created successfully"));
    } catch (error) {
      console.log(error);
      dispatch(runFailProcess("failed to create fees group"));
    }

    setfomstate({
      amount: 0,
      name: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Fees Group Name <span className="text-red-500">*</span>
        </label>
        <Input
          name="name"
          id="name"
          value={formstate.name}
          onChange={handleChange}
          placeholder="Enter fees group name"
          className="mt-1 block w-full"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (optional)
        </label>
        <Input
          name="description"
          id="description"
          value={formstate.description}
          onChange={handleChange}
          placeholder="Enter a description"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount <span className="text-red-500">*</span>
        </label>
        <Input
          name="amount"
          id="amount"
          type="number"
          value={formstate.amount}
          onChange={handleChange}
          placeholder="Enter the amount"
          className="mt-1 block w-full"
          required
          min={1}
        />
      </div>
      <div>
        <Button type="submit" className="bg-blue-600 text-white">
          Create Fees Group
        </Button>
      </div>
    </form>
  );
};

export default FeesGroupForm;
