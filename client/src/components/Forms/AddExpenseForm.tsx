import { SelectComponent } from "../custom/SelectComponent";
import Input from "../custom/Input";
import { useState } from "react";
import { createExpense } from "@/app/Api/expense";

const statusOptions = [
  { name: "pending", value: "pending" },
  { name: "paid", value: "paid" },
  { name: "overdue", value: "overdue" },
];

interface IExpenseRecordFormState {
  name: string;
  schoolId: string;
  amount: number;
  paymentDate: Date;
  transactionType: string;
  status: "paid" | "pending" | "overdue";
}

function AddExpenseForm() {
  const [formState, setFormState] = useState<Partial<IExpenseRecordFormState>>({
    name: "",
    amount: 0,
    paymentDate:new Date(Date.now()) ,
    transactionType: "",
    status: "pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  function updateformState(val: string, val2: string) {
    setFormState({ ...formState, [val]: val2 });
  }

  const resetForm = () => {
    setFormState({
      name: "",
      amount: 0,
      paymentDate: new Date(Date.now()),
      transactionType: "",
      status: "pending",
    });
  };

  const handleSubmit = async () => {
    const result = await createExpense(formState);
    if (!result) {
      console.log("error  recording expense");
    }
    resetForm()
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Record Expense</h1>
      <div className="flex space-x-8 mt-6 mb-4">
        <Input
          name="name"
          label="Expense Name"
          placeholder="describe... "
          className="border-2 mt-1 w-64"
          value={formState.name}
          onChange={handleChange}
        />
        <Input
          name="transactionType"
          label="Expense Type"
          placeholder="expense type"
          className="border-2 mt-1 w-64"
          value={formState.transactionType}
          onChange={handleChange}
        />
        <label className="flex flex-col gap-2">
          <span className="font-semibold">Status</span>
          <SelectComponent
            options={statusOptions}
            placeholder="status"
            handleSelectChange={(value) => updateformState("status", value)}
          />
        </label>
        <Input
          name="amount"
          label="Amount"
          placeholder="amount"
          className="border-2 mt-1 w-64"
          type="number"
          value={formState.amount}
          onChange={handleChange}
        />
      </div>
      <Input
        name="paymentDate"
        label="Due Date"
        placeholder="due date"
        className="border-2 w-64"
        type="date"
        value={String(formState.paymentDate)}
        onChange={handleChange}
      />
      <div className="flex gap-4 mt-8">
        <button
          className="bg-myBlue w-28 px-4 py-2 text-white font-semibold rounded"
          onClick={() => handleSubmit()}
        >
          Save
        </button>
        <button
          className="bg-black px-4 py-2 text-white font-semibold rounded w-28"
          onClick={resetForm}
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default AddExpenseForm;
