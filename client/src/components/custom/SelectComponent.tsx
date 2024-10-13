import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectOption {
  name: string;
  value: string;
}


interface SelectComponentProps {
  options: SelectOption[];
  handleSelectChange: (value: string) => void;
  placeholder?: string;
}

export function SelectComponent({
  options = [],
  handleSelectChange,
  placeholder = "Select an option",
}: SelectComponentProps) {

  const onSelectChange = (value: string) => {
    handleSelectChange(value);
  };

  return (
    <Select onValueChange={onSelectChange}  >
      <SelectTrigger className="w-[180px] text-gray-500">
        <SelectValue className="placeholder:text-gray-400" placeholder={placeholder}  />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          {options.map((option) => (
            <SelectItem key={option.name} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
