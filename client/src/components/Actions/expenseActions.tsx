import { useEffect, useState } from "react";
import { getExpenseById, updateExpense } from "@/app/Api/expense";
import { IExpenseRecord } from "@/app/globals";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import InfoDisplay from "../custom/InfoDisplay";

function ExpenseActions({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (val: boolean) => void;
}) {
  const [expense, setExpense] = useState<IExpenseRecord | null>(null); //

  const [updatedExpensestate, setUpdatedExpense] = useState<
    Partial<IExpenseRecord>
  >({
    name: "",
    paymentDate: new Date(),
    amount: 0,
    transactionType: "",
    status: "pending",
  });

  function handleChange(val: string | Date, name: string) {
    if (val === "") return;
    setUpdatedExpense((prev) => ({ ...prev, [name]: val }));
  }

  const handleSave = async () => {
    try {
      if (!expense?._id) return;
      const updatedStudent = await updateExpense(
        expense?._id,
        updatedExpensestate
      );
      console.log("Student updated successfully:", updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  useEffect(() => {
    const getExpenseDetails = async () => {
      try {
        const expenseData = await getExpenseById(id);

        if ("error" in expenseData) {
          console.error(expenseData.error);
        } else {
          setExpense(expenseData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getExpenseDetails();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="px-2 hover:cursor-default hover:bg-slate-50 py-1 rounded">
          View Details
        </p>
      </DialogTrigger>
      <DialogContent className="w-[900px]">
        <h1 className="font-semibold text-lg">Expense Details</h1>
        <div className="mt-auto">
          <div className="flex gap-10 items-center">
            <div className="text-gray-500 font-semibold">
              Expense ID: <span className="font-mono text-black">{id}</span>
            </div>
          </div>
          <InfoDisplay
            name="name"
            label="name"
            value={expense?.name || "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            label="amount"
            name="amount"
            value={expense ? `$${expense.amount}` : "N/A"}
            onChange={handleChange}
            inputType="number"
          />
          <InfoDisplay
            label="paymentDate"
            name="paymentDate"
            inputType="date"
            value={
              expense?.paymentDate
                ? new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(new Date(expense.paymentDate))
                : "N/A"
            }
            onChange={handleChange}
          />
          <InfoDisplay
            label="Transaction Type"
            name="transactionType"
            value={expense?.transactionType || "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            label="status"
            name="Status"
            value={expense?.status || "N/A"}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5 flex gap-5">
          <Button className="bg-myBlue" onClick={() => handleSave()}>
            Edit
          </Button>
          <Button
            className="w-20"
            onClick={() => setOpen(false)}
            variant={"destructive"}
          >
            Exit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ExpenseActions;
