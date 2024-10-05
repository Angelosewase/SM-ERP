import { FC, ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Ui/accordion";
import { Link } from "react-router-dom";

export const NavigationComponent: FC<{
  Item?: ReactNode;
  label?: string;
  showLabel?: boolean;
  link?: string;
}> = ({ Item, label, showLabel, link }) => {
  if (link) {
    return (
      <Link
        to={link}
        className="flex items-center gap-4 bg-blue-950 text-white my-1 mx-1 p-2 rounded hover:shadow-xl"
      >
        {Item}
        {showLabel && <p className="font-semibold text-md">{label}</p>}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-blue-950 text-white my-1 mx-1 p-2 rounded hover:shadow-xl">
      {Item}
      {showLabel && <p className="font-semibold text-md">{label}</p>}
    </div>
  );
};

export const DropDown: FC<{
  Item: ReactNode;
  content: ReactNode;
  setMaximize: (val: boolean) => void;
  maximize: boolean;
}> = ({ content, Item, maximize, setMaximize }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className={`border-1 border-red-400  ${
          maximize ? " w-[250px]" : "w-16"
        }`}
      >
        <AccordionTrigger
          className="no-underline hover:no-underline p-0 font-semibold text-md gap-4"
          onClick={() => {
            if (!maximize) setMaximize(true);
          }}
        >
          {Item}
        </AccordionTrigger>
        {maximize && (
          <AccordionContent className="w-full my-1 px-2 py-1 bg-blue-900">
            {content}
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};
