// teacherColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/Button";
// import { ISubject } from "@/app/globals";
import { Subject } from "./table";
import SubjectActions from "@/components/Actions/subjectsAction";
import ActionsMenu from "@/components/custom/DropDown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteSubject } from "@/app/Api/subjects";

export const columns: ColumnDef<Subject>[] = [
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
      const handleDelete = async (subjectId: string) => {
        try {
          await deleteSubject(subjectId);
        } catch (err) {
          console.log("Failed to delete student");
          console.error(err);
        }
      };

      return (
        <ActionsMenu>
          <SubjectActions id={subject._id || ""} setOpen={() => {}} />
          <DropdownMenuItem onClick={() => handleDelete(subject._id)}>
            delete
          </DropdownMenuItem>
        </ActionsMenu>
      );
    },
  },
];
