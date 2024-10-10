import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

interface SelectOption {
  name: string;
  value: string;
}


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
