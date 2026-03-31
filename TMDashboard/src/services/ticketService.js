import apiClient from "./apiClient";

export const fetchTicketsAPI = async (limit, skip) => {
  const response = await apiClient.get(`/todos?limit=${limit}&skip=${skip}`);

  return response.data;
};
