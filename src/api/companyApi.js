// src/api/companyApi.js
import api from "../utils/axiosInstance.js"; // Use the centralized instance

export const getCompanyProfile = async (id) => {
  const res = await api.get(`/companies/${id}`);
  return res.data;
};

export const updateCompanyProfile = async (id, data) => {
  const res = await api.put(`/companies/${id}`, data);
  return res.data;
};
