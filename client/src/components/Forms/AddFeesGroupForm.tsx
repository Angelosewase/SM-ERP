import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { IFeeGroup } from "@/app/globals";
import Input from "../custom/Input";
import { runFailProcess } from "@/app/features/proccesThunk";
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
type FeesGroupFormProps = {
  onSubmit?: (data: Omit<IFeeGroup, "id">) => void;
};

const FeesGroupForm: React.FC<FeesGroupFormProps> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure all fields are valid
    if (!name || !amount) {
      dispatch(runFailProcess("all fields are required"));
      return;
    }

    // Call onSubmit with the form data
    // onSubmit({
    //   name,
    //   description, // optional
    //   schoolId,
    //   amount: Number(amount),
    // });

    // Clear form after submission
    setName("");
    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Fees Group Name */}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter fees group name"
          className="mt-1 block w-full"
          required
        />
      </div>

      {/* Fees Group Description */}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
          className="mt-1 block w-full"
        />
      </div>

      {/* School ID */}

      {/* Fees Group Amount */}
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
          value={amount}
          //@ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
          onChange={(e) => setAmount(`${e.target.value}`)}
          placeholder="Enter the amount"
          className="mt-1 block w-full"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <Button type="submit" className="bg-blue-600 text-white">
          Create Fees Group
        </Button>
      </div>
    </form>
  );
};

export default FeesGroupForm;
