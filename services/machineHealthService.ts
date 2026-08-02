import api from "./api";

export const getMachineHealth = async () => {
  const res = await api.get("/machine-health/");
  return res.data;
};

export const createMachineHealth = async (data: any) => {
  const res = await api.post("/machine-health/", data);
  return res.data;
};

export const updateMachineHealth = async (
  healthId: number,
  data: any
) => {
  const res = await api.put(`/machine-health/${healthId}`, data);
  return res.data;
};

export const deleteMachineHealth = async (healthId: number) => {
  const res = await api.delete(`/machine-health/${healthId}`);
  return res.data;
};