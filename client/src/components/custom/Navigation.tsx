import {
  AcademicCapIcon,
  Bars3BottomRightIcon,
  BookOpenIcon,
  CircleStackIcon,
  Cog8ToothIcon,
  RectangleGroupIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { FC, ReactNode, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Ui/accordion";

function NavigationMenu() {
  const [maximize, setMaximize] = useState<boolean>(true);

  return (
    <div className={`h-[100vh] ${maximize ? "w-72" : "w-20"} bg-blue-900 transition-all duration-300`}>
      <div>
        <div className="bg-red-700 h-24 flex justify-between px-4">
          <img
            src="/schoolLogo.png"
            alt="school logo"
            className={`w-16 h-auto self-center ${!maximize && "hidden"}`}
          />
          <button onClick={() => setMaximize(!maximize)}>
            <Bars3BottomRightIcon className="text-white h-10" />
          </button>
        </div>
        <NavigationComponent
          Item={<RectangleGroupIcon className="w-8" />}
          label="Dashboard"
          showLabel={maximize}
        />
        <NavigationComponent
          Item={
            <DropDown
              Item={
                <div className="flex gap-4 items-center">
                  <AcademicCapIcon className="w-8" /> {maximize && "Students"}
                </div>
              }
              content={
                <div>
                  <p className="font-semibold p-2 my-0.5 hover:bg-blue-950">
                    All students
                  </p>
                  <p className="font-semibold p-2 my-0.5 hover:bg-blue-950">
                    Add student
                  </p>
                  <p className="font-semibold p-2 my-0.5 hover:bg-blue-950">
                    Students promotion
                  </p>
                </div>
              }
            />
          }
        />

        <NavigationComponent
          Item={<UserGroupIcon className="w-8" />}
          label="Parents"
          showLabel={maximize}
        />

        <NavigationComponent
          Item={
            <DropDown
              Item={
                <div className="flex gap-4 items-center">
                  <AcademicCapIcon className="w-8" /> {maximize && "Teachers"}
                </div>
              }
              content={
                <div>
                  <p className="font-semibold p-2 my-0.5 hover:bg-blue-950">
                    All teachers
                  </p>
                  <p className="font-semibold p-2 my-0.5 hover:bg-blue-950">
                    Add teachers
                  </p>
                </div>
              }
            />
          }
        />

        <NavigationComponent
          Item={
            <DropDown
              Item={
                <div className="flex gap-4 items-center">
                  <CircleStackIcon className="w-8" /> {maximize && "Account"}
                </div>
              }
              content={
                <div>
                  <p className="font-semibold p-2 my-0.5 hover:bg-blue-950">
                    Fees group
                  </p>
                  <p className="font-semibold p-2 my-0.5 hover:bg-blue-950">
                    Student fees
                  </p>
                  <p className="font-semibold p-2 my-0.5 hover:bg-blue-950">
                    Expenses
                  </p>
                  <p className="font-semibold p-2 my-0.5 hover:bg-blue-950">
                    Add fees
                  </p>
                </div>
              }
            />
          }
        />

        <NavigationComponent
          Item={<BookOpenIcon className="w-8" />}
          label="Subjects"
          showLabel={maximize}
        />
        <NavigationComponent
          Item={<Cog8ToothIcon className="w-8" />}
          label="Settings"
          showLabel={maximize}
        />
      </div>
    </div>
  );
}

export default NavigationMenu;

const NavigationComponent: FC<{
  Item?: ReactNode;
  label?: string;
  showLabel?: boolean;
}> = ({ Item, label, showLabel }) => {
  return (
    <div className="flex items-center gap-4 bg-blue-950 text-white my-1 mx-0.5 p-2 rounded hover:shadow-xl">
      {Item}
      {showLabel && <p className="font-semibold text-md">{label}</p>}
    </div>
  );
};

const DropDown: FC<{
  Item: ReactNode;
  content: ReactNode;
}> = ({ content, Item }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className="border-1 border-red-400  w-[270px] "
      >
        <AccordionTrigger className="no-underline hover:no-underline p-0 font-semibold text-md gap-4">
          {Item}
        </AccordionTrigger>
        <AccordionContent className="w-full my-1 px-2 py-1 bg-blue-900">
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
