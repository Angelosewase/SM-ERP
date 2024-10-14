// teacherColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/Button";
import { ITeacher } from "@/app/globals"; // Adjust the import path based on your file structure
import ActionsMenu from "@/components/custom/DropDown";
import TeacherActions from "@/components/Actions/TeachersActions";
import { deleteTeacher } from "@/app/Api/teachers";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<ITeacher>[] = [
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
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-1"
      >
        Email
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "subjects",
    header: "Subjects",
    cell: ({ row }) => <div>{row.getValue("subjects")}</div>,
  },
  {
    accessorKey: "classes",
    header: "Classes",
    cell: ({ row }) => <div>{row.getValue("classes")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const teacher = row.original;
      const handleDelete = async (teacherId: string) => {
        try {
          await deleteTeacher(teacherId); 
              } catch (err) {
          console.log("Failed to delete student");
          console.error(err);
        } 
      };

      return (
        <ActionsMenu>
          <>
            <TeacherActions id={teacher._id ||"no teacher"} setState={() => {}} />
            <DropdownMenuItem onClick={() => handleDelete(teacher._id || " no teacher")}>
              delete
            </DropdownMenuItem>
          </>
        </ActionsMenu>
      );
    },
  },
];
