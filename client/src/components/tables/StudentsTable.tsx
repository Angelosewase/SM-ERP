"use client";

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
import { columns } from "./studentsColumns";
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

// Generate dummy data matching the student schema
const data: Student[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    schoolId: "school1",
    class: "class1",
    parents: ["parent1", "parent2"],
    gender: "female",
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    schoolId: "school2",
    class: "class2",
    parents: ["parent3"],
    gender: "male",
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    schoolId: "school3",
    class: "class3",
    parents: ["parent4"],
    gender: "male",
  },
  {
    id: "4",
    firstName: "Daisy",
    lastName: "Green",
    email: "daisy.green@example.com",
    schoolId: "school4",
    class: "class1",
    parents: ["parent5"],
    gender: "female",
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    schoolId: "school2",
    class: "class2",
    parents: ["parent3"],
    gender: "male",
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    schoolId: "school3",
    class: "class3",
    parents: ["parent4"],
    gender: "male",
  },
  {
    id: "4",
    firstName: "Daisy",
    lastName: "Green",
    email: "daisy.green@example.com",
    schoolId: "school4",
    class: "class1",
    parents: ["parent5"],
    gender: "female",
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    schoolId: "school2",
    class: "class2",
    parents: ["parent3"],
    gender: "male",
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    schoolId: "school3",
    class: "class3",
    parents: ["parent4"],
    gender: "male",
  },
];

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  schoolId: string;
  class: string;
  parents: string[];
  gender: "male" | "female";
};

export function StudentTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 7,
  });

  const table = useReactTable({
    data,
    columns,
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
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex flex-1 gap-10">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <Input
            placeholder="Filter class..."
            value={(table.getColumn("class")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("class")?.setFilterValue(event.target.value)
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

      <div className="rounded-md Myblue border border-b-0">
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
                ["pageIndex"]: pageSize.pageIndex - 1,
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
                ["pageIndex"]: pageSize.pageIndex + 1,
              })
            }
            className="bg-myBlue text-white"
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
