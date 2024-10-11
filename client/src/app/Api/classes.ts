import axios from "axios";
import { IClass } from "../globals";

const BASE_URL = "http://localhost:3000/class";

export const fetchClasses = async (): Promise<IClass[]> => {
  try {
    const response = await axios.get<IClass[]>(BASE_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

interface fmtclass {
  name: string;
  value: string;
}
export const fetchformattedClasses = async (): Promise<fmtclass[]> => {
  try {
    const response = await axios.get<fmtclass[]>(`${BASE_URL}/fmt`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const fetchClassById = async (classId: string): Promise<IClass> => {
  try {
    const response = await axios.get<IClass>(`${BASE_URL}/${classId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching class by ID:", error);
    throw error;
  }
};
export const createClass = async (classData: IClass): Promise<IClass> => {
  try {
    const response = await axios.post<IClass>(BASE_URL, classData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
};
export const updateClass = async (
  classId: string,
  classData: Partial<IClass>
): Promise<IClass> => {
  try {
    const response = await axios.put<IClass>(
      `${BASE_URL}/${classId}`,
      classData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};

export const deleteClass = async (classId: string): Promise<IClass> => {
  try {
    const response = await axios.delete<IClass>(`${BASE_URL}/${classId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};
