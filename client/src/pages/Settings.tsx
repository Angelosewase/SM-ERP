import Header from "@/components/custom/Header";

function Settings() {
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col flex-1 ">
          <p className="font-bold  mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /<span className="text-myBlue font-semibold">settings</span>
          </p>
        </div>
        <div className="bg-white h-[78vh] mt-2 rounded w-[95%] mx-auto relative">
          <p className="absolute top-10 left-10 text-white font-bold text-lg">
            Account settings
          </p>
          <img
            src="/waterFall.png"
            alt="profile img"
            className="w-full h-[38%] "
          />

          <div className="absolute top-32  left-10 p-1 bg-white rounded-full">
            <img
              src="/profileLarge.png "
              alt=" profile sample pic "
              className="w-52 rounded-full"
            />
          </div>

          <div className="mt-32 z-50 px-10">
            <p className="text-lg font-semibold mb-10">
              Prince afful Quansah{" "}
              <span className="font-normal text-gray-600 text-base">
                {" "}
                -Admin
              </span>
            </p>
            <div className="flex gap-4 items-center w-[80%] my-2">
              <p className="font-semibold">School name</p>
              <div className="px-4 py-1 border border-black font-semibold rounded flex-1">Firm Foundation Scholl -acra</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
