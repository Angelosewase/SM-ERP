import { fetchformattedClasses } from "@/app/Api/classes";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useEffect, useState } from "react";
  
  interface classOption {
    name: string;
    value: string;
  }
  
  
  interface SelectComponentProps {
    handleSelectChange: (value: string) => void;
    placeholder?: string;
  }
  
  export function SelectClass({
    handleSelectChange,
    placeholder = "Select an class",
  }: SelectComponentProps) {
    const [options,setOptions ]= useState<classOption[]>([])
    const onSelectChange = (value: string) => {
      handleSelectChange(value);
    };

    useEffect(()=>{
    async function getclasses(){
      const classes = await fetchformattedClasses()
      if(classes){
        setOptions(classes)
      }
    }
    getclasses()
    })
  
    return (
      <Select onValueChange={onSelectChange}>
        <SelectTrigger className="w-[180px] text-gray-500">
          <SelectValue className="placeholder:text-gray-400" placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  