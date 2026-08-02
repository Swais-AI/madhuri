import api from "./api";

// Get all machine types
export const getMachineTypes = async () => {
  const res = await api.get("/machine-types/");
  return res.data;
};

// Get one machine type
export const getMachineTypeById = async (id: number) => {
  const res = await api.get(`/machine-types/${id}`);
  return res.data;
};

// Create
export const createMachineType = async (data: any) => {
  const res = await api.post("/machine-types/", data);
  return res.data;
};

// Update
export const updateMachineType = async (id: number, data: any) => {
  const res = await api.put(`/machine-types/${id}`, data);
  return res.data;
};

// Delete
export const deleteMachineType = async (id: number) => {
  const res = await api.delete(`/machine-types/${id}`);
  return res.data;
};