import api from "./api";

export interface MachinePayload {
  machine_code: string;
  machine_name: string;
  machine_type_id: number;
  manufacturer?: string;
  model_number?: string;
  installation_date?: string | null;
  location?: string;
  status: string;
}

export const getMachines = async () => {
  const res = await api.get("/machines/");
  return res.data;
};

export const getMachineById = async (machineId: number) => {
  const res = await api.get(`/machines/${machineId}`);
  return res.data;
};

export const addMachine = async (data: MachinePayload) => {
  const res = await api.post("/machines/", data);
  return res.data;
};

export const updateMachine = async (
  machineId: number,
  data: MachinePayload
) => {
  const res = await api.put(`/machines/${machineId}`, data);
  return res.data;
};

export const deleteMachine = async (machineId: number) => {
  const res = await api.delete(`/machines/${machineId}`);
  return res.data;
};