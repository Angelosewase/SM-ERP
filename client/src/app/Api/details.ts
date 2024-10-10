import axios from "axios";

import { schoolIBase, UserIBase } from "../globals";

export interface accountDetails {
  user: UserIBase;
  school: schoolIBase;
}

export async function getAccountDetails(): Promise<accountDetails | null> {
  try {
    const response = await axios.get("http://localhost:3000/details", {
      withCredentials: true,
    });

    return {
      user: response.data.user,
      school: response.data.school,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
