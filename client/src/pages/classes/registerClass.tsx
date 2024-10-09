import Header from "@/components/custom/Header"

function registerClass() {
  return (
    <div className="h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col">
          <p className="font-bold  mt-4">classes</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /
            <span className="text-myBlue font-semibold">register class</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default registerClass