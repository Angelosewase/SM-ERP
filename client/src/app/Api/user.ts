import axios from "axios";
import { UserIBase } from "../globals";

const BASE_URL = "http://localhost:3000/users";

export const updateUser = async (
  id: string,
  userData: Partial<UserIBase>
): Promise<UserIBase> => {
  try {
    const response = await axios.put<UserIBase>(`${BASE_URL}/${id}`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Error updating user");
    }
    throw new Error("An unexpected error occurred");
  }
};
