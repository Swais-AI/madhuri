import api from "./api";

export const getPredictions = async () => {
  const response = await api.get("/tool-wear-predictions/");
  return response.data;
};

export const createPrediction = async (data: any) => {
  const response = await api.post("/tool-wear-predictions/", data);
  return response.data;
};