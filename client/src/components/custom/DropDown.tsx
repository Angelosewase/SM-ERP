import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/Button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

const ActionsMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {React.Children.map(children, (child) => {
          return React.cloneElement(child as React.ReactElement, { open, setOpen });
        })}
    <DropdownMenuItem>
         delete
    </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};



export default ActionsMenu