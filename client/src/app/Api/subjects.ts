import axios from 'axios';
import { ISubject } from '@/app/globals'; 

const BASE_URL = "http://localhost:3000/subjects";

export const createSubject = async (data: Partial<ISubject>): Promise<ISubject | { error: string }> => {
  try {
    const response = await axios.post<ISubject>(BASE_URL, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getSubjects = async (): Promise<ISubject[] | { error: string }> => {
  try {
    const response = await axios.get<ISubject[]>(BASE_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Get a subject by ID
export const getSubjectById = async (id: string): Promise<ISubject | { error: string }> => {
  try {
    const response = await axios.get<ISubject>(`${BASE_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateSubject = async (id: string, data: Partial<Omit<ISubject, "_id" | "createdAt" | "updatedAt">>): Promise<ISubject | { error: string }> => {
  try {
    const response = await axios.put<ISubject>(`${BASE_URL}/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


export const deleteSubject = async (id: string): Promise<{ message: string } | { error: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(`${BASE_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error: any): { error: string } => {
  if (error.response) {
    return { error: error.response.data.message || "An error occurred" };
  } else if (error.request) {
    return { error: "No response from the server. Please try again later." };
  } else {
    return { error: "An unexpected error occurred. Please try again." };
  }
};
