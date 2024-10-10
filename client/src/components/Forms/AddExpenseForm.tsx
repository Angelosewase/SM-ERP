import { SelectComponent } from "../custom/SelectComponent";
import Input from "../custom/Input";

const statusOptions = [
  {
    name: "pending ",
    value: "pending",
  },
  {
    name: "paid",
    value: "paid ",
  },
  {
    name: "overdue ",
    value: "overdue ",
  },
];
function AddExpenseForm() {
  return (
    <div>
      <h1 className="text-xl font-semibold ">Record Expense</h1>
      <div className="flex  space-x-8   mt-6 mb-4 ">
        <Input
          name="name"
          label="expense name"
          placeholder="describe... "
          className="border-2 mt-1 w-64"
        />

        <Input
          name="type"
          label="expense type"
          placeholder="expebnse type"
          className="border-2 mt-1 w-64"
        />

        <label className=" flex flex-col gap-2">
          <span className="font-semibold">status</span>
          <SelectComponent options={statusOptions} placeholder="status" />
        </label>

        <Input
          name="amount"
          label="amount"
          placeholder="amount "
          className="border-2 mt-1 w-64"
          type="number"
        />

      </div >
      <Input
          name="dueDate "
          label="due date "
          placeholder="due date "
          className="border-2 w-64 "
          type="date"
        />
   
   
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

export default AddExpenseForm;
