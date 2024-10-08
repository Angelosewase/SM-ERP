import axios from "axios";

export async function IsAuth(): Promise<string | null> {
  try {
    const response = await axios.get("http://localhost:3000/users/isAuth", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Unauthorized to access the given path first login", error)
    return null;
  }
}
