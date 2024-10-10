import Header from "@/components/custom/Header";
import AddExpenseForm from "@/components/Forms/AddExpenseForm";

function AddExpenses() {
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col flex-1 ">
          <p className="font-bold  mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /
            <span className="text-myBlue font-semibold">add expenses</span>
          </p>
        </div>
        <div className="h-[50vh] w-full bg-white mt-6  rounded py-3 px-4 flex flex-col justify-between pb-10">
          <AddExpenseForm />
        </div>
      </div>
    </div>
  );
}

export default AddExpenses;
