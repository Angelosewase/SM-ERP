import Header from "@/components/custom/Header";

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
              <InfoDispay
                name="school name"
                value="Firm Foundation Scholl -acra"
              />
              <InfoDispay
                name="Email"
                value="sewasejo8@gmail.com"
              />
              <InfoDispay
                name="mobile no"
                value="+250725541525"
              />
              <InfoDispay
                name="Address"
                value="Kigali rwanda"
              />
              <InfoDispay
                name="names "
                value="Sewase Angel"
              />
              <InfoDispay
                name="Password "
                value="........."
              />
         
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface infoDisplay {
  name: string;
  value: string;
}
const InfoDispay = ({ name, value }: infoDisplay) => {
  return (
    <div>
      <div className="flex gap-4 items-center w-[80%] my-2">
        <p className="font-semibold w-2/12">{name}</p>
        <div className="px-4 py-1 border border-black font-semibold rounded flex-1">
          {value}
        </div>
      </div>
    </div>
  );
};

export default Settings;
