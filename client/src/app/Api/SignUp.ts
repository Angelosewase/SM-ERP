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
    const userId: string = (
      await axios.post("http://localhost:3000/users/registerUser", data)
    ).data.id;

    return userId;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function SubmitSchoolInfo(
  data: schoolInfo
): Promise<schoolIBase | null> {
  if (!data.admin) {
    console.log("no user created ");
    return null;
  }

  try {
    const schoolData: schoolIBase = (
      await axios.post("http://localhost:3000/school/register", data)
    ).data;
    return schoolData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
