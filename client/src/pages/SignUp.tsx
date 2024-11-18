import React, { useLayoutEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import Input from "../components/custom/Input";
import { Progress } from "@/components/ui/progress";
import PasswordInput from "@/components/custom/PasswordInput";
import { useNavigate } from "react-router-dom";
import { IsAuth } from "@/app/Api/auth";
import { runFailProcess } from "@/app/features/proccesThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { registerSchoolAndUser } from '@/app/features/schoolSlice';

export interface FormData {
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  password: string;
  confirmPassword: string;
  schoolName: string;
  schoolEmail: string;
  schoolLocation: string;
  adminUserId: string | null;
}

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    async function isAuth() {
      const isLoggedIn: string | null = await IsAuth();

      if (isLoggedIn) {
        navigate("/sys");
        return;
      }
    }
    isAuth();
  }, [navigate]);

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
    schoolEmail: "",
    schoolLocation: "",
    adminUserId: null as string | null,
  });

  const handleNextStep = async () => {
    if (step === 1) {
      if (
        formData.adminFirstName.length < 3 ||
        formData.adminLastName.length < 3 ||
        formData.adminEmail.length < 3
      ) {
        dispatch(runFailProcess("Please enter valid credentials"));
        return;
      }
      setStep(step + 1);
    } else if (step === 2) {
      if (formData.password !== formData.confirmPassword) {
        dispatch(runFailProcess("Passwords do not match"));
        return;
      }
      setStep(step + 1);
    } else if (step === 3) {
      const result = await dispatch(registerSchoolAndUser(formData));
      console.log(result)
      if (result) {
        navigate("/verifyAccount");
      }
      if (result === null) {
        dispatch(runFailProcess("Failed to create school"));
      }
    }
  };

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-[100vw] h-[100vh] flex  items-center flex-col bg-gray-50">
      {step === 1 && (
        <SchoolRegistrationStep1
          handleNextStep={handleNextStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 2 && (
        <SchoolRegistrationStep2
          handleNextStep={handleNextStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 3 && (
        <SchoolRegistrationStep3
          handleNextStep={handleNextStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
      <Progress value={step * 30} className="w-40 mt-100 mt-10" />
    </div>
  );
}

export default SignUp;

const SchoolRegistrationStep1: React.FC<{
  handleNextStep: () => void;
  formData: FormData;
  updateFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleNextStep, formData, updateFormData }) => {
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
              placeholder="Enter first name"
              className="border-2 placeholder:text-md w-[350px] "
              value={formData.adminFirstName}
              onChange={updateFormData}
            />
            <Input
              name="adminLastName"
              placeholder="Enter last name"
              className="border-2 placeholder:text-md w-[350px] "
              value={formData.adminLastName}
              onChange={updateFormData}
            />
            <Input
              name="adminEmail"
              placeholder="Enter your email"
              className="border-2 placeholder:text-md w-[350px] "
              value={formData.adminEmail}
              onChange={updateFormData}
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

const SchoolRegistrationStep2: React.FC<{
  handleNextStep: () => void;
  formData: FormData;
  updateFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleNextStep, formData, updateFormData }) => {
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
              label="Password"
              placeholder="Enter password"
              value={formData.password}
              onChange={updateFormData}
            />
            <PasswordInput
              name="confirmPassword"
              label="Confirm password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={updateFormData}
            />
            <p className="text-gray-600 text-xs font-semibold ">
              password must be atleast 8 characters
            </p>
            <Button className="bg-blue-900 w-44" onClick={handleNextStep}>
              <span className="text-white font-semibold">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const SchoolRegistrationStep3: React.FC<{
  handleNextStep: () => void;
  formData: FormData;
  updateFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ handleNextStep, updateFormData, formData }) => {
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
              className="border-2 placeholder:text-md"
              value={formData.schoolName}
              onChange={updateFormData}
            />
            <Input
              name="schoolEmail"
              placeholder="Enter school email"
              className="border-2 placeholder:text-md"
              value={formData.schoolEmail}
              onChange={updateFormData}
            />
            <Input
              name="schoolLocation"
              placeholder="Enter school location"
              className="border-2 placeholder:text-md"
              value={formData.schoolLocation}
              onChange={updateFormData}
            />
            <Button className="bg-blue-900 w-44" onClick={handleNextStep}>
              <span className="text-white font-semibold">Finish</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
