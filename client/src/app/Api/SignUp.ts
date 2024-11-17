import axios from "axios";
import { schoolIBase } from "../globals";

interface userInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface schoolInfo {
  schoolName: string;
  address: string;
  email: string;
  admin: string | null;
}

export async function SubmitUserInfo(data: userInfo): Promise<string | null> {
  try {
    const response = await axios.post("http://localhost:3000/auth/register", data);
    return response.data.id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to create user");
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function SubmitSchoolInfo(data: schoolInfo): Promise<schoolIBase | null> {
  try {
    const response = await axios.post("http://localhost:3000/school/register", data);
    return response.data.school;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to create school");
    }
    throw new Error("An unexpected error occurred");
  }
}
