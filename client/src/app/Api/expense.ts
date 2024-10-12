import axios from 'axios';
import { IExpenseRecord } from '@/app/globals'; 

const BASE_URL = "http://localhost:3000/expenses";

export const createExpense = async (data: Omit<IExpenseRecord, "_id" | "createdAt" | "updatedAt">): Promise<IExpenseRecord | { error: string }> => {
  try {
    const response = await axios.post<IExpenseRecord>(BASE_URL, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getExpenses = async (): Promise<IExpenseRecord[] | { error: string }> => {
  try {
    const response = await axios.get<IExpenseRecord[]>(BASE_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


export const getExpenseById = async (id: string): Promise<IExpenseRecord | { error: string }> => {
  try {
    const response = await axios.get<IExpenseRecord>(`${BASE_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


export const updateExpense = async (id: string, data: Partial<Omit<IExpenseRecord, "_id" | "createdAt" | "updatedAt">>): Promise<IExpenseRecord | { error: string }> => {
  try {
    const response = await axios.put<IExpenseRecord>(`${BASE_URL}/${id}`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


export const deleteExpense = async (id: string): Promise<{ message: string } | { error: string }> => {
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
