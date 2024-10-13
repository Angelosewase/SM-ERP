import { getSubjects } from "@/app/Api/subjects";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertSubjectsToValueNamePairs } from "@/utils/objects";
import { useEffect, useState } from "react";

interface SelectComponentProps {
  handleSelectChange: (value: string) => void;
  placeholder?: string;
}

export interface selectI {
  name: string;
  value: string;
}

export function SelectSubject({
  handleSelectChange,
  placeholder = "Select subjects",
}: SelectComponentProps) {
  const [options, setOptions] = useState<selectI[]>([]);
  const onSelectChange = (value: string) => {
    handleSelectChange(value);
  };

  useEffect(() => {
    async function getSubjectdata() {
      const subjects = await getSubjects();

      if (Array.isArray(subjects))
        setOptions(convertSubjectsToValueNamePairs(subjects));
    }
    getSubjectdata();
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
                no subjects found
              </SelectItem>
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
