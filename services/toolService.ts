import api from "./api";

export interface ToolPayload {
  tool_code: string;
  tool_name: string;
  tool_type_id: number;
  manufacturer?: string;
  expected_life_hours: number;
  current_life_hours?: number;
  tool_status: string;
}

export interface ToolUpdatePayload {
  tool_code?: string;
  tool_name?: string;
  tool_type_id?: number;
  manufacturer?: string;
  expected_life_hours?: number;
  current_life_hours?: number;
  tool_status?: string;
}

export const getTools = async () => {
  const response = await api.get("/tools/");
  return response.data;
};

export const getToolById = async (toolId: number) => {
  const response = await api.get(`/tools/${toolId}`);
  return response.data;
};

export const createTool = async (data: ToolPayload) => {
  const response = await api.post("/tools/", data);
  return response.data;
};

export const updateTool = async (
  toolId: number,
  data: ToolUpdatePayload
) => {
  const response = await api.put(
    `/tools/${toolId}`,
    data
  );

  return response.data;
};

export const deleteTool = async (toolId: number) => {
  const response = await api.delete(
    `/tools/${toolId}`
  );

  return response.data;
};