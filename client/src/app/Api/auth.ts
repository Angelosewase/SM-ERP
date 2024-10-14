import axios from "axios";

export async function IsAuth(): Promise<string | null> {
  try {
    const response = await axios.get("http://localhost:3000/users/isAuth", {
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
    const response = await axios.get("http://localhost:3000/users/logout", {
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
