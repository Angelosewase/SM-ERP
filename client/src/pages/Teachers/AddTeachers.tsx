import Header from "@/components/custom/Header";
import AddteacherForm from "@/components/Forms/AddteacherForm";

function AddTeachers() {
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col flex-1 ">
          <p className="font-bold  mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /
            <span className="text-myBlue font-semibold">Register teachers</span>
          </p>
        </div>

        <div className=" w-full bg-white mt-6  rounded py-3 px-4 flex flex-col justify-between pb-10">
          <div>
            <h1 className="text-xl font-semibold ">Add new teacher </h1>
            <AddteacherForm />
          </div>
          <div className=" mt-10">
            <div className="flex gap-4 items-end mb-8">
              <div className=" w-40 h-40 rounded-full bg-gray-200"></div>
              <div className="m">
                <p>upload teacher's photo (150px by 150px)</p>
                <input
                  type="file"
                  name="studentPhoto"
                  className="text-sm mb-6 "
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-myBlue w-28 px-4 py-1 text-white font-semibold rounded">
                save
              </button>
              <button className="bg-black px-4 py-1 text-white font-semibold rounded w-28">
                reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTeachers;
