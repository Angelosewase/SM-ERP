import * as React from "react";

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
import { Class, columns } from "./columns";
import { Button } from "@/components/ui/Button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchClasses } from "@/app/Api/classes";
import { transformClass } from "@/utils/objects";
import ColumnsDropDown from "@/components/custom/ColumnsDropDown";

// Placeholder data
// const placeholderData: Class[] = [
//   {
//     _id: "1",
//     name: "Class A",
//     studentsCount: 25,
//     subjectsCount: 5,
//     createdAt: new Date("2024-01-01"),
//   },
// ];

export function ClassTable() {
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

  const [classesState, setClassesState] = React.useState<Class[]>([]);

  React.useEffect(() => {
    async function getClassesData() {
      const classes = await fetchClasses();
      if (!classes) {
        console.log("no classes found");
      }
      const organizedClass = classes.map((classObject) => {
        return transformClass(classObject);
      });
      setClassesState(organizedClass);
    }

    getClassesData();
  });
   
  const table = useReactTable({
    data: classesState,
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
            placeholder="Filter classes..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <ColumnsDropDown table={table} />
      </div>

      <div className="rounded-md border border-b-0">
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
                  No classes added yet
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
    </div>
  );
}
