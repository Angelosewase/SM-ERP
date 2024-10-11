import Header from "@/components/custom/Header";
import { ExpenseTable } from "@/components/tables/expenses/table";

function Expenses() {
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col flex-1 ">
          <p className="font-bold  mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /<span className="text-myBlue font-semibold">Expenses</span>
          </p>
        </div>
        <div className="w-full bg-white mt-6  rounded py-3 px-4 flex flex-col justify-between ">
          <ExpenseTable />
        </div>
      </div>
    </div>
  );
}

export default Expenses;
