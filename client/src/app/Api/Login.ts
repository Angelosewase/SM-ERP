import axios from "axios";

interface loginInInfo {
  email: string;
  password: string;
}

export async function Login(data: loginInInfo): Promise<string | null> {
  console.log("Sending login request to the server...");

  try {
    const response = await axios.post(
      "http://localhost:3000/users/login",
      data,
      { withCredentials: true }
    );


    if (response.status === 200) {
      const userId = response.data.userId;
      return userId;
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
