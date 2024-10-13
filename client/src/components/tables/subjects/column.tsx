// teacherColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/Button";
// import { ISubject } from "@/app/globals"; 
import { Subject } from "./table";
import SubjectActions from "@/components/Actions/subjectsAction";
import ActionsMenu from "@/components/custom/DropDown";

export const columns: ColumnDef<Subject>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
        subject name
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "teacher",
    header: "teachers",
    cell: ({ row }) => <div>{row.getValue("teacher")}</div>,
  },
  {
    accessorKey: "classes",
    header: "classes",
    cell: ({ row }) => <div>{row.getValue("classes")}</div>,
  },
  {
    accessorKey: "days",
    header: "days",
    cell: ({ row }) => <div>{row.getValue("classes")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const subject = row.original;

      return (
        <ActionsMenu>
        <SubjectActions id={subject._id || ""} setOpen={() => {}} />
      </ActionsMenu>
      );
    },
  },
];
