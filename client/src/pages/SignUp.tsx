import React, { useState } from "react";
import Button from "../components/Ui/Button";
import Input from "../components/Ui/Input";
import { Progress } from "@/components/Ui/progress";
import PasswordInput from "@/components/Ui/PasswordInput";

function SignUp() {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex  items-center flex-col bg-gray-50">
      {step === 1 && (
        <SchoolRegistrationStep1 handleNextStep={handleNextStep} />
      )}
      {step === 2 && (
        <SchoolRegistrationStep2 handleNextStep={handleNextStep} />
      )}
      {step === 3 && (
        <SchoolRegistrationStep3 handleNextStep={handleNextStep} />
      )}
      <Progress value={(step *30 )} className="w-40 mt-100 mt-10" />
    </div>
  );
}

export default SignUp;

const SchoolRegistrationStep1: React.FC<{ handleNextStep: () => void }> = ({
  handleNextStep,
}) => {
  return (
    <>
      <div className="fade-in-10">
        <p className="mt-20 text-4xl text-gray-600 mb-8  ">
          Welcome, create your school acount
        </p>
        <div className="my-auto shadow-lg shadow-gray-100  w-[756px] h-[460px] p-16 rounded-xl bg-white  flex flex-col items-center">
          <p className="text-gray-500 text-xl mb-10 ">
            It is our great pleasure to have you onboard !{" "}
          </p>
          <div className="flex flex-col gap-4 p-4 items-center">
            <Input
              name="schoolName"
              placeholder="Enter school name"
              className="border-2  placeholder:text-md"
            />
            <Input
              name="schoolEmail"
              placeholder="Enter school email"
              className="border-2  placeholder:text-md"
            />
            <Input
              name="school location"
              placeholder="Enter school location"
              className="border-2  placeholder:text-md"
            />
            <Button className="bg-blue-900 w-44" onClick={handleNextStep}>
              <span className="text-white font-semibold">Next</span>
            </Button>
            <p className="text-gray-600 text-xs font-semibold ">
              Already have an account ?
              <a href="/" className="text-blue-600 hover:underline">
                {" "}
                log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const SchoolRegistrationStep2: React.FC<{ handleNextStep: () => void }> = ({
  handleNextStep,
}) => {
  return (
    <>
      <div className="fade-in-40">
        <p className="mt-20 text-4xl text-gray-600 mb-8  ">
         Enter your admin information
        </p>
        <div className="my-auto shadow-lg shadow-gray-100  w-[756px] h-[460px] py-16 rounded-xl bg-white  flex flex-col items-center">
          <p className="text-gray-500 text-xl mb-10 ">
            Setup your information to get started !{" "}
          </p>
          <div className="flex flex-col gap-4 p-4 items-center">
            <Input
              name="adminFirstName"
              placeholder="Enter  first  name"
              className="border-2  placeholder:text-md"
            />
            <Input
              name="adminLastName"
              placeholder="Enter last name"
              className="border-2  placeholder:text-md"
            />
            <Input
              name="adminEmail"
              placeholder="Enter your email"
              className="border-2  placeholder:text-md"
            />
            <Button className="bg-blue-900 w-44" onClick={handleNextStep}>
              <span className="text-white font-semibold">Next</span>
            </Button>
            <p className="text-gray-600 text-xs font-semibold ">
              Already have an account ?
              <a href="/" className="text-blue-600 hover:underline">
                log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
const SchoolRegistrationStep3: React.FC<{ handleNextStep: () => void }> = ({
  handleNextStep,
}) => {
  return (
    <>
      <div>
        <p className="mt-20 text-4xl text-gray-600 mb-8 ">
        Almost there ! setup your credentials 
        </p>
        <div className="my-auto shadow-lg shadow-gray-100 w-[756px] h-[460px]  px-20 py-16 rounded-xl bg-white  flex flex-col items-center">
        
          <div className="flex flex-col gap-4 p-4 items-center">
            <PasswordInput
              name="password"
              label="password"
              placeholder="enter password"
            />
            <PasswordInput
              name="password"
              label="confirm password"
              placeholder="confirm  password"
            />
            <p className="text-gray-600 text-xs font-semibold ">
              password must be atleast 8 characters
            </p>
            <Button className="bg-blue-900 w-44" onClick={handleNextStep}>
              <span className="text-white font-semibold">Finish</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
