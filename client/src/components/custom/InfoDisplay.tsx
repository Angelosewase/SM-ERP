import { PencilIcon } from "@heroicons/react/24/outline";
import React, { HTMLInputTypeAttribute, useState } from "react";

interface InfoDisplayProps {
  name: string;
  value: string;
  onChange: (newValue: string | Date, name: string) => void;
  edit?: boolean;
  label: string;
  inputType?: HTMLInputTypeAttribute
}

export const InfoDisplay = ({
  name,
  value,
  onChange,
  edit = true,
  label,
  inputType = 'text'
}: InfoDisplayProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
    setInputValue(value);
  };

  const handleCancel = () => {
    setInputValue("");
    setIsEditing(false);
  };

  return (
    <div className="flex gap-4 items-center w-[80%] my-2">
      <p className="w-2/12 capitalize">{label}:</p>
      {isEditing ? (
        <div className="flex items-center flex-1">
          <input
            type={inputType}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange(e.target.value, name);
            }}
            className="px-4 py-1 border-2 border-myBlue rounded flex-1 outline-none transition duration-200 focus:border-blue-500"
            aria-label={`Edit ${label}`}
            autoFocus
          />
          <button
            onClick={handleCancel}
            className="ml-2 text-red-600"
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center flex-1">
          <div className="px-4 py-1 border-2 border-gray-400 font-semibold rounded flex-1">
            {value}
          </div>
          {edit ? (
            <button
              onClick={handleEditClick}
              className="ml-2"
              aria-label="Edit"
            >
              <PencilIcon className="h-4 w-5 text-blue-500" />
            </button>
          ) : (
            <button className="w-7"></button>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoDisplay;
