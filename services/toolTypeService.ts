import api from "./api";

export interface ToolTypePayload {
  tool_type_name: string;
  description?: string;
}

export const getToolTypes = async () => {
  const response = await api.get("/tool-types/");
  return response.data;
};

export const createToolType = async (
  data: ToolTypePayload
) => {
  const response = await api.post("/tool-types/", data);
  return response.data;
};

export const updateToolType = async (
  toolTypeId: number,
  data: ToolTypePayload
) => {
  const response = await api.put(
    `/tool-types/${toolTypeId}`,
    data
  );

  return response.data;
};

export const deleteToolType = async (
  toolTypeId: number
) => {
  const response = await api.delete(
    `/tool-types/${toolTypeId}`
  );

  return response.data;
};