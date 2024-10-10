import axios from "axios";
import { IStudent } from "../globals";

const BASE_URL = "http://localhost:3000/student";



export const fetchStudents = async (): Promise<IStudent[]> => {
  try {
    const response = await axios.get<IStudent[]>(BASE_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const fetchStudentById = async (studentId: string): Promise<IStudent> => {
  try {
    const response = await axios.get<IStudent>(`${BASE_URL}/${studentId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    throw error;
  }
};

export const createStudent = async (studentData: IStudent): Promise<IStudent> => {
  try {
    const response = await axios.post<IStudent>(BASE_URL, studentData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const updateStudent = async (studentId: string, studentData: Partial<IStudent>): Promise<IStudent> => {
  try {
    const response = await axios.put<IStudent>(`${BASE_URL}/${studentId}`, studentData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const deleteStudent = async (studentId: string): Promise<IStudent> => {
  try {
    const response = await axios.delete<IStudent>(`${BASE_URL}/${studentId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
