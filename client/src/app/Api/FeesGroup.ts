
import { IFeeGroup } from '@/app/globals'; 
import axios from 'axios';

const BASE_URL = '/fees/fee-groups';

export const createFeeGroup = async (feeGroupData: Omit<IFeeGroup, '_id'>) => {
  try {

  const response = await axios.post<IFeeGroup>(`${BASE_URL}`, feeGroupData);
  return response.data; 
  } catch (error) {
    console.log(error)
  }

  // const response = await axios.post('/fee-groups', feeGroupData);
  // return response.data;
};

export const getFeeGroupsBySchool = async (schoolId: string) => {
  const response = await axios.get(`/fee-groups/${schoolId}`);
  return response.data;
};

export const getFeeGroupById = async (id: string) => {
  const response = await axios.get(`/fee-groups/${id}`);
  return response.data;
};

export const updateFeeGroup = async (id: string, feeGroupData: Partial<IFeeGroup>) => {
  const response = await axios.put(`/fee-groups/${id}`, feeGroupData);
  return response.data;
};

export const deleteFeeGroup = async (id: string) => {
  const response = await axios.delete(`/fee-groups/${id}`);
  return response.data;
};
