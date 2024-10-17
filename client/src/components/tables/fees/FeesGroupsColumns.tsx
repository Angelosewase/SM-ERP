import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/Button";
import ActionsMenu from "@/components/custom/DropDown";
  import FeesGroupActions from "@/components/Actions/FeesGroupActionMenu"; 
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
// import { deleteFeesGroup } from "@/app/Api/feesGroup"; // 
import { IFeeGroup } from "@/app/globals";
export const columns: ColumnDef<IFeeGroup>[] = [ 
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
        Name
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>{row.getValue("description") || "No description provided"}</div>
    ),
  },
  
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div>{row.getValue("amount")}</div>
    ),
  },
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const feesGroup = row.original;
      const handleDelete = async (feesGroupId: string) => {
        try {
        //   await deleteFeesGroup(feesGroupId);
        console.log(feesGroupId)
          // Optionally, refresh the table or provide feedback
        } catch (err) {
          console.log("Failed to delete fees group");
          console.error(err);
        }
      };
      return (
        <ActionsMenu>
          <>
            <FeesGroupActions id={feesGroup._id || ""} setState={() => {}} /> 
            <DropdownMenuItem onClick={() => handleDelete(feesGroup._id || "")} className="px-2 font-semibold">Delete</DropdownMenuItem>
          </>
        </ActionsMenu>
      );
    },
  },
];
