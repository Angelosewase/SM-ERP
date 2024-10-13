import { fetchTeachers, fmtTeacher } from "@/app/Api/teachers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transformTeachers } from "@/utils/objects";
import { useEffect, useState } from "react";


interface SelectComponentProps {
  handleSelectChange: (value: string) => void;
  placeholder?: string;
}

export function SelectTeacher({
  handleSelectChange,
  placeholder = "Select teacher",
}: SelectComponentProps) {
  const [options, setOptions] = useState<fmtTeacher[]>([]);
  const onSelectChange = (value: string) => {
    handleSelectChange(value);
  };

  useEffect(() => {
    async function getTeachers() {
      const teachers = await fetchTeachers();
      if (teachers) {
        setOptions(transformTeachers(teachers));
      }
    }
    getTeachers();
  });

  return (
    <Select onValueChange={onSelectChange}>
      <SelectTrigger className="w-[180px] text-gray-500">
        <SelectValue
          className="placeholder:text-gray-400"
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
          {options.length === 0 && (
            <>
              <SelectItem value="null" disabled>
                no teachers found
              </SelectItem>
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
