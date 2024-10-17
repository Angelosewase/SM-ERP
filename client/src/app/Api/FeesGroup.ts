
import { IFeeGroup } from '@/app/globals'; 
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/fees-groups';

export const createFeeGroup = async (feeGroupData: Partial<IFeeGroup>) => {
  try {
  const response = await axios.post<IFeeGroup>(`${BASE_URL}`, feeGroupData,{withCredentials:true});
  return response.data; 
  } catch (error) {
    console.log(error)
  }

};

export const getFeeGroups = async () => {
  try {
  const response = await axios.get(`${BASE_URL}`, {
    withCredentials:true
  });
  return response.data;
} catch (error) {
  console.error(error);
}
};
export const getFeeGroupById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateFeeGroup = async (id: string, feeGroupData: Partial<IFeeGroup>) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, feeGroupData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFeeGroup = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
