import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/Button";
import { IExpenseRecord } from "@/app/globals";
import ExpenseActions from "@/components/Actions/expenseActions";
import ActionsMenu from "@/components/custom/DropDown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteExpense } from "@/app/Api/expense";

export const columns: ColumnDef<IExpenseRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-1"
      >
        Expense Name
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div>${row.getValue("amount")}</div>, // formatted amount
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("paymentDate")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "transactionType",
    header: "Transaction Type",
    cell: ({ row }) => <div>{row.getValue("transactionType")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div
          className={`capitalize ${
            status === "paid"
              ? "text-green-500"
              : status === "pending"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {status as string}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const expense = row.original;
      const handleDelete = async (expenseID: string) => {
        try {
          await deleteExpense(expenseID);
        } catch (err) {
          console.log("Failed to delete expense");
          console.error(err);
        }
      };

      return (
        <ActionsMenu>
          <>
            <ExpenseActions id={expense._id || ""} setOpen={() => {}} />
            <DropdownMenuItem onClick={() => handleDelete(expense._id)}>
              delete
            </DropdownMenuItem>
          </>
        </ActionsMenu>
      );
    },
  },
];
