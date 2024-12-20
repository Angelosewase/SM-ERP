import { IParent } from "@/app/globals";
import { Button } from "@/components/ui/Button";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React from "react";
import { columns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Input from "@/components/custom/Input";
import { fetchParents } from "@/app/Api/parent";
import ColumnsDropDown from "@/components/custom/ColumnsDropDown";

// const generateDummyData = (): IParent[] => {
//   return [
//     {
//       _id: "1",
//       firstName: "John",
//       lastName: "Doe",
//       email: "john.doe@example.com",
//       phoneNumber: "123-456-7890",
//       child: "Child A",
//       gender: "male",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },

//   ];
// };

export function ParentTable() {
  const [data, setData] = React.useState<IParent[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 7,
  });

  React.useEffect(() => {
    async function getClassesData() {
      const parents = await fetchParents();
      if (!parents) {
        console.log("no parents found");
      }
      setData(parents);
    }

    getClassesData();
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
            name="emails"
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            name="name"
            placeholder="Filter first name..."
            value={
              (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("firstName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            name="name"
            placeholder="Filter last name..."
            value={
              (table.getColumn("lastName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("lastName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <ColumnsDropDown table={table} />
      </div>

      <Table className="border ">
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No parents yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
              setPageSize({ ...pageSize, pageIndex: pageSize.pageIndex - 1 })
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
              setPageSize({ ...pageSize, pageIndex: pageSize.pageIndex + 1 })
            }
            disabled={!table.getCanNextPage()}
            className="bg-myBlue text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
