import axios from "axios";
import { IParent } from "../globals"; 

const BASE_URL = "http://localhost:3000/parent";

export const fetchParents = async (): Promise<IParent[]> => {
  try {
    const response = await axios.get<IParent[]>(BASE_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching parents:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || "An error occurred while fetching parents.");
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const fetchParentById = async (parentId: string): Promise<IParent> => {
  try {
    const response = await axios.get<IParent>(`${BASE_URL}/${parentId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching parent by ID:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || `An error occurred while fetching the parent with ID: ${parentId}.`);
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const createParent = async (parentData: IParent): Promise<IParent> => {
  try {
    const response = await axios.post<IParent>(BASE_URL, parentData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating parent:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || "An error occurred while creating the parent.");
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const updateParent = async (parentId: string, parentData: Partial<IParent>): Promise<IParent> => {
  try {
    const response = await axios.put<IParent>(`${BASE_URL}/${parentId}`, parentData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error updating parent:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || `An error occurred while updating the parent with ID: ${parentId}.`);
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const deleteParent = async (parentId: string): Promise<IParent> => {
  try {
    const response = await axios.delete<IParent>(`${BASE_URL}/${parentId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error deleting parent:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || `An error occurred while deleting the parent with ID: ${parentId}.`);
    }
    throw new Error("An unexpected error occurred.");
  }
};
