import axios from "axios";
import { schoolIBase, UserIBase } from "../globals";

interface loginInInfo {
  email: string;
  password: string;
}

export interface loginResponse {
  user: UserIBase;
  school: schoolIBase;
  message: string;
}

export async function Login(data: loginInInfo): Promise<loginResponse | null> {
  console.log("Sending login request to the server...");

  try {
    const response = await axios.post(
      "http://localhost:3000/users/login",
      data,
      { withCredentials: true }
    );

    if (response.status === 200) {
      return response.data
    } else {
      console.log(`Unexpected status code: ${response.status}`);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error:", error.response?.data || error.message);
    } else {
      console.log("Unexpected error:", error);
    }
    return null;
  }
}

export async function isLoggedIN() {
  try {
    const response = await axios.get("http://localhost:3000/users/isAuth");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
