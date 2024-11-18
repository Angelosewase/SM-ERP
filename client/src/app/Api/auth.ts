import axios from "axios";

export async function IsAuth(): Promise<string | null> {
  try {
    const response = await axios.get("http://localhost:3000/auth/isLoggedIn", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Unauthorized to access the given path first login", error);
    return null;
  }
}

export const logout = async () => {
  try {
    const response = await axios.get("http://localhost:3000/auth/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Error logging out");
    }
    throw new Error("An unexpected error occurred");
  }
};

export async function verifyAccount(data: any, userId :string): Promise<string> {
  try {
    const response = await axios.post(
      `http://localhost:3000/auth/verify/${userId}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "error verify data ");
    }
    throw new Error("unexpected error occured");
  }
}

export async function resendAccountVerificationOtp() {
  try {
    await axios.get("", { withCredentials: true });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Failed to resend the verification  account");
    }
    throw new Error("unexpected error occured");
  }
}
