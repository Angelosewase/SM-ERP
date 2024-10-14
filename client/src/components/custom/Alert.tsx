import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {  useSelector } from "react-redux";
import { processSelector } from "@/app/features/processSlice";

export function CustomAlert() {
  const state = useSelector(processSelector);
  const alertStyles = {
    idle: "border-gray-300 bg-gray-100 text-gray-800",
    inProgress: "border-blue-400 bg-blue-100 text-blue-800",
    completed: "border-green-400 bg-green-100 text-green-800",
    failed: "border-red-400 bg-red-100 text-red-800",
  };

  const currentStyle = alertStyles[state.status as keyof typeof alertStyles];

  return (
    state.showNotification && (
      <Alert className={`fixed ${currentStyle} bottom-6 left-2 w-[300px] border p-4 rounded shadow-lg transition duration-300`}>
        <RocketIcon className="h-4 w-4 mr-2" />
        <div>
          <AlertTitle className="font-bold">{state.status}</AlertTitle>
          <AlertDescription className="mt-1">{state.message}</AlertDescription>
        </div>
      </Alert>
    )
  );
}
