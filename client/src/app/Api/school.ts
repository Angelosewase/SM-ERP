import axios from "axios";
import { schoolIBase } from "../globals";
const BASE_URL = "http://localhost:3000/school";

export const updateSchool = async (
  schoolData: Partial<schoolIBase>
): Promise<schoolIBase> => {
  try {
    const response = await axios.put<schoolIBase>(
      `${BASE_URL}`,
      schoolData,{
        withCredentials:true
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Error updating school");
    }
    throw new Error("An unexpected error occurred");
  }
};
