import { IFeeGroup } from "@/app/globals";
import Header from "@/components/custom/Header"
import FeesGroups from "@/components/tables/fees/FeesGroups"
import { Bars3BottomLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline"


const feesGroupData: IFeeGroup[] = [
  {
    _id: "1",
    name: "Primary School Fees",
    description: "Fees for primary school students",
    schoolId: "SCH123",

  },
  {
    _id: "2",
    name: "High School Fees",
    description: "Fees for high school students",
    schoolId: "SCH456",

  },
  {
    _id: "3",
    name: "Boarding Fees",
    description: "Boarding fees for residential students",
    schoolId: "SCH789",
  },
];


function FeesGroup() {
  return (
    <div className="h-[100vh]">
    <Header />
    <div className="px-6 flex-1">
      <div className="flex flex-col ">
        <p className="font-bold  mt-4">Students</p>
        <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
        <p className="text-gray-600 inline-block">Home /<span className="text-myBlue font-semibold">Fees group</span></p>
      </div>
      </div>

      <div className="bg-white flex-1 min-h-[300px]  m-4 p-4">
        <div className="flex  mb-4">
        <button className="flex  font-semibold text-sm gap-1  mr-3 items-center  hover:underline ">
          <Bars3BottomLeftIcon className="h-6 " />
          Fees Group list
        </button>
        <button className="flex font-semibold text-sm gap-1  mr-3 items-center  hover:underline">
          <PencilSquareIcon className="h-6" />
          Add fees group
        </button>
        </div>
      
      <FeesGroups  data={feesGroupData}/>
      </div>
  </div>
  )
}

export default FeesGroup