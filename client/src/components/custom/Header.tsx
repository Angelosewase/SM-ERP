import {  BellIcon, EnvelopeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Header() {
  return (
    <div className="flex-1 shadow-md shadow-gray-200 bg-white h-16 flex items-center justify-between px-2 ">
      <HeaderSearchInput />
      <Menu />
    </div>
  );
}

export default Header;

function HeaderSearchInput() {
  return (
    <>
      <div className=" gap-1   flex  mx-2 py-1 pl-4 pr-6  hover:cursor-pointer">
        <MagnifyingGlassIcon className="h-6 text-gray-400 " />
        <div className="text-gray-400 ">Press Ctrk +K</div>
      </div>
    </>
  );
}

const Menu = () => {
  return <div className="flex gap-1 items-center">
     <EnvelopeIcon className="h-5  text-myBlue "/>
     <BellIcon className="h-5  text-myBlue "/> 
     <div className="mx-1 border-l-2 border-black px-2">
         <img src="/profile.png" alt="profile placeholder"  className="h-8"/>
     </div>
  </div>;
};
