import { IFeeGroup } from "@/app/globals";
import Header from "@/components/custom/Header";
import AddFeesGroupDialog from "@/components/custom/AddFeesGroup";
import FeesGroups from "@/components/tables/fees/FeesGroups";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getFeeGroups } from "@/app/Api/FeesGroup";

// const feesGroupData: IFeeGroup[] = [
//   {
//     _id: "1",
//     name: "Primary School Fees",
//     description: "Fees for primary school students",
//     amount: "SCH123",

//   },
//   {
//     _id: "2",
//     name: "High School Fees",
//     description: "Fees for high school students",
//     amount: "SCH456",

//   },
//   {
//     _id: "3",
//     name: "Boarding Fees",
//     description: "Boarding fees for residential students",
//     amount: "SCH789",
//   },
// ];

function FeesGroup() {
  const [data, setData] = useState<IFeeGroup[]>([]);

  useEffect(() => {
    async function getdata() {
      try {
        const responseData: IFeeGroup[] = await getFeeGroups();
        setData(responseData);
        console.log(responseData)
      } catch (error) {
        console.log(error);
      }
    }
    getdata();
  });

  return (
    <div className="h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col ">
          <p className="font-bold  mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /<span className="text-myBlue font-semibold">Fees group</span>
          </p>
        </div>
      </div>

      <div className="bg-white flex-1 min-h-[300px]  m-4 p-4">
        <div className="flex  mb-4">
          <button className="flex  font-semibold text-sm gap-1  mr-3 items-center   border-r   pr-3 border-black">
            <Bars3BottomLeftIcon className="h-6 " />
            Fees Group list
          </button>
          <AddFeesGroupDialog />
        </div>

        <FeesGroups data={data} />
      </div>
    </div>
  );
}

export default FeesGroup;
