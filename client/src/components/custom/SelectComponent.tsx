import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

// Define a type for the options
interface SelectOption {
  name: string;
  value: string;
}

// Define the props for the SelectComponent
interface SelectComponentProps {
  options: SelectOption[];
  handleSelectChange?: (value: string) => void;
  placeholder?: string;
}

export function SelectComponent({
  options = [],
  handleSelectChange,
  placeholder = "Select an option",
}: SelectComponentProps) {
  // State to manage the selected option
  const [selectedValue, setSelectedValue] = useState<string>("");
     
  const onSelectChange = (value: string) => {
    console.log(value)
    setSelectedValue(value);
    if (handleSelectChange) {
      handleSelectChange(selectedValue);
    }
  };

  return (
    <Select onValueChange={onSelectChange}>
      <SelectTrigger className="w-[180px] text-gray-500">
        <SelectValue className="placeholder:text-gray-400" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, idx) => (
            <SelectItem key={idx} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
