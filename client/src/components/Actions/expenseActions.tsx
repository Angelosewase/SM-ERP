import { useEffect, useState } from "react";
import { getExpenseById } from "@/app/Api/expense"; // Adjust the import based on your file structure
import { IExpenseRecord } from "@/app/globals"; // Adjust the import based on your file structure
import { Button } from "@/components/ui/Button"; // Adjust the import based on your file structure
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // Adjust the import based on your file structure
import { handleChange, InfoDisplay } from "@/pages/Settings"; // Adjust the import based on your file structure

function ExpenseActions({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (val: boolean) => void;
}) {
  const [expense, setExpense] = useState<IExpenseRecord | null>(null); //

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
            name="Name"
            value={expense?.name || "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            name="Amount"
            value={expense ? `$${expense.amount}` : "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            name="payment date"
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
            name="Transaction Type"
            value={expense?.transactionType || "N/A"}
            onChange={handleChange}
          />
          <InfoDisplay
            name="Status"
            value={expense?.status || "N/A"}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5 flex gap-5">
          <Button className="bg-myBlue" onClick={() => setOpen(false)}>
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
