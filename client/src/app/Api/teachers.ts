import axios from "axios";
import { ITeacher } from "../globals";

// Base URL for the API
const BASE_URL = "http://localhost:3000/teacher";

export interface fmtTeacher {
  name: string;
  value: string;
}

export const fetchTeachers = async (): Promise<ITeacher[]> => {
  try {
    const response = await axios.get<ITeacher[]>(BASE_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

export const createTeacher = async (
  teacherData: ITeacher
): Promise<ITeacher> => {
  try {
    const response = await axios.post<ITeacher>(BASE_URL, teacherData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};

export const deleteTeacher = async (teacherId: string): Promise<ITeacher> => {
  try {
    const response = await axios.delete<ITeacher>(`${BASE_URL}/${teacherId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
};

export const updateTeacher = async (
  teacherId: string,
  teacherData: Partial<ITeacher>
): Promise<ITeacher> => {
  try {
    const response = await axios.put<ITeacher>(
      `${BASE_URL}/${teacherId}`,
      teacherData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw error;
  }
};

export const fetchTeacherById = async (
  id: string
): Promise<ITeacher | null> => {
  try {
    const response = await axios.get<ITeacher>( `${BASE_URL}/${id}`,{withCredentials:true});
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
