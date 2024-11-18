import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { schoolSelector } from "@/app/features/schoolSlice";
import { verifyAccount } from "@/app/Api/auth";
import { runCompleteProcess, runFailProcess } from "@/app/features/proccesThunk";
import { AppDispatch } from "@/app/store";
import { useNavigate } from "react-router-dom";

export function InputOTPPattern({
  value,
  setValue,
}: {
  value: string;
  setValue: (val: string) => void;
}) {
  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      className="gap-2"
      onChange={setValue}
      value={value}
    >
      <InputOTPGroup>
        <InputOTPSlot
          index={0}
          className="w-14 h-14 text-3xl mx-1 border-2 rounded-lg "
        />
        <InputOTPSlot
          index={1}
          className="w-14 h-14 text-3xl  mx-1 border-2 rounded-lg"
        />
        <InputOTPSlot
          index={2}
          className="w-14 h-14 text-3xl mx-1 border-2 rounded-lg"
        />
        <InputOTPSlot
          index={3}
          className="w-14 h-14 text-3xl mx-1 border-2 rounded-lg"
        />
        <InputOTPSlot
          index={4}
          className="w-14 h-14 text-3xl mx-1 border-2 rounded-lg"
        />
        <InputOTPSlot
          index={5}
          className="w-14 h-14 text-3xl mx-1 border-2 rounded-lg"
        />
      </InputOTPGroup>
    </InputOTP>
  );
}

function VerifyAccount() {
  const [otpState, setOtpState] = useState<string>("");
  const school = useSelector(schoolSelector).school
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  async function handleSubmit() {
    if (!school) {
    dispatch(runFailProcess("no user found"))
      return;
    }
  if(otpState.length != 6){
    dispatch(runFailProcess("Invalid otpcode "))
      return;
    }
    try {
      const res = await verifyAccount({
        otpCode: otpState,
      },school.admin[0] || "error");
      dispatch(runCompleteProcess(res))
      navigate("/")
    } catch (error) {
      if(error instanceof Error)
      dispatch(runFailProcess(error.message))
    }
  }

  function resendCode() {}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Verify Your Account
          </h1>
          <p className="text-gray-500">
            Please enter the verification code sent to your email
          </p>
        </div>

        <div className="flex justify-center">
          <InputOTPPattern value={otpState} setValue={setOtpState} />
        </div>

        <div className="space-y-4">
          <button
            className="w-full py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            onClick={handleSubmit}
          >
            Verify Code
          </button>
          <p className="text-sm text-center text-gray-600">
            Didn't receive the code?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={resendCode}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
