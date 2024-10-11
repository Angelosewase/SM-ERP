import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns"; // Import your custom column definitions
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IExpenseRecord } from "@/app/globals";

// Define the ExpenseRecord type for your data
export type ExpenseRecord = {
  id: string;
  name: string;
  amount: number;
  paymentDate: string; // assuming ISO string or Date object
  transactionType: string;
  status: "paid" | "pending" | "overdue";
};

const expenseRecords: IExpenseRecord[] = [
  {
    _id: "52ac8008-acc7-4995-8d17-0279e97aaab4",
    name: "Nancy Schroeder",
    schoolId: "11bd581e-78b3-4fcc-988c-f5ee82a705a0",
    amount: 1844.98,
    paymentDate: new Date("2023-10-31"),
    transactionType: "credit",
    status: "paid",
    createdAt: new Date("2024-08-25T16:49:44"),
    updatedAt: new Date("2024-10-11T16:47:37"),
  },
  {
    _id: "db1c488b-0e33-43ed-ba1f-b8069de49f30",
    name: "Tiffany Henry",
    schoolId: "86561218-72d7-4aca-a29d-467ccc7a3493",
    amount: 1905.19,
    paymentDate: new Date("2024-05-30"),
    transactionType: "debit",
    status: "overdue",
    createdAt: new Date("2023-12-29T12:18:41"),
    updatedAt: new Date("2024-10-11T16:45:18"),
  },
  {
    _id: "c9677ff8-4293-4de9-9690-8496b10025c1",
    name: "Donald Peters",
    schoolId: "69de7f61-6ec9-4a65-a12f-e8f2921ad5df",
    amount: 2204.34,
    paymentDate: new Date("2024-04-10"),
    transactionType: "credit",
    status: "overdue",
    createdAt: new Date("2023-11-09T23:36:39"),
    updatedAt: new Date("2024-10-11T16:43:26"),
  },
  {
    _id: "ebee9edc-01cd-420c-b9ff-18503b9e5043",
    name: "Donna Davis",
    schoolId: "d96427c6-04d9-428f-b9f4-04dbe7ce6ba3",
    amount: 4829.79,
    paymentDate: new Date("2024-01-10"),
    transactionType: "debit",
    status: "overdue",
    createdAt: new Date("2024-02-10T02:14:49"),
    updatedAt: new Date("2024-10-11T16:46:44"),
  },
  {
    _id: "7c1ee54d-bc49-443d-b443-eba581d2f8b1",
    name: "Nicholas Erickson",
    schoolId: "77f4c9e3-f64e-4524-b394-eba8edd0dcd2",
    amount: 2253.37,
    paymentDate: new Date("2023-11-25"),
    transactionType: "debit",
    status: "overdue",
    createdAt: new Date("2024-07-19T20:33:00"),
    updatedAt: new Date("2024-10-11T16:45:58"),
  },
];

export function ExpenseTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: expenseRecords,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: pageSize,
    },
  });

  return (
    <>
      <div className="flex items-center py-4">
        <div className="flex flex-1 gap-10">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <Input
            placeholder="Filter by transaction type..."
            value={
              (table
                .getColumn("transactionType")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("transactionType")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


      <div className="rounded-md Myblue border border-b-0 ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.resetRowSelection()}
            className="bg-myBlue text-white"
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPageSize({
                ...pageSize,
                pageIndex: pageSize.pageIndex - 1,
              })
            }
            disabled={!table.getCanPreviousPage()}
            className="bg-myBlue text-white"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPageSize({
                ...pageSize,
                pageIndex: pageSize.pageIndex + 1,
              })
            }
            className="bg-myBlue text-white"
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
