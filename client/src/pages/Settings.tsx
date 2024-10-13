import Header from "@/components/custom/Header";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react"; // Import useState

export function handleChange(val: string) {
  if (val === "") {
    return;
  }
}

function Settings() {
  return (
    <div className="h-full pb-10">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col flex-1 ">
          <p className="font-bold  mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /<span className="text-myBlue font-semibold">settings</span>
          </p>
        </div>
        <div className="bg-white  mt-2 rounded w-[95%] mx-auto relative">
          <p className="absolute top-10 left-10 text-white font-bold text-lg">
            Account settings
          </p>
          <img
            src="/waterFall.png"
            alt="profile img"
            className="w-full h-[250px] "
          />

          <div className="absolute top-24  left-10 p-1 bg-white rounded-full">
            <img
              src="/profileLarge.png "
              alt=" profile sample pic "
              className="w-52 rounded-full"
            />
          </div>

          <div className="mt-16 z-50 px-10">
            <p className="text-lg font-semibold mb-10">
              Prince afful Quansah{" "}
              <span className="font-normal text-gray-600 text-base">
                -Admin
              </span>
            </p>

            <div className=" pb-10 ">
              <InfoDisplay
                name="school name"
                value="Firm Foundation Scholl -acra"
                onChange={handleChange}
              />
              <InfoDisplay
                name="Email"
                value="sewasejo8@gmail.com"
                onChange={handleChange}
              />
              <InfoDisplay
                name="mobile no"
                value="+250725541525"
                onChange={handleChange}
              />
              <InfoDisplay
                name="Address"
                value="Kigali rwanda"
                onChange={handleChange}
              />
              <InfoDisplay
                name="names "
                value="Sewase Angel"
                onChange={handleChange}
              />
              <InfoDisplay
                name="Password "
                value="........."
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoDisplayProps {
  name: string;
  value: string;
  onChange: (newValue: string) => void;
  edit?: boolean;
}

export const InfoDisplay = ({
  name,
  value,
  onChange,
  edit = true,
}: InfoDisplayProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onChange(inputValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-4 items-center w-[80%] my-2">
      <p className=" w-2/12 capitalize">{name} :</p>
      {isEditing ? (
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="px-4 py-1 border-2 border-myBlue rounded flex-1 outline-none"
          />
          <button onClick={handleSave} className="ml-2 text-green-600">
            Save
          </button>
          <button onClick={handleCancel} className="ml-2 text-red-600">
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center flex-1 ">
          <div className="px-4 py-1 border-2  border-gray-400 font-semibold rounded flex-1  ">
            {value}
          </div>
          {edit ? (
            <button onClick={handleEditClick} className="ml-2">
              <PencilIcon className="h-4 font-semibold w-5 text-blue-500" />
            </button>
            
          ):(
            <p className="w-7"></p>
          )

          }
        </div>
      )}
    </div>
  );
};

export default Settings;
