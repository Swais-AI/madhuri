import api from "./api";

export const getMachines = async () => {
  const res = await api.get("/machines/");
  return res.data;
};

export const getTools = async () => {
  const res = await api.get("/tools/");
  return res.data;
};

export const getMachineHealth = async () => {
  const res = await api.get("/machine-health/");
  return res.data;
};

export const getPredictions = async () => {
  const res = await api.get("/tool-wear-predictions/");
  return res.data;
};

export const getAlerts = async () => {
  const res = await api.get("/alerts/");
  return res.data;
};