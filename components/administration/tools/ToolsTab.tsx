"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import {
  createTool,
  deleteTool,
  getTools,
  updateTool,
} from "@/services/toolService";

import { getToolTypes } from "@/services/toolTypeService";

interface ToolType {
  tool_type_id: number;
  tool_type_name: string;
}

interface Tool {
  tool_id: number;
  tool_code: string;
  tool_name: string;
  tool_type_id: number;
  manufacturer?: string;
  expected_life_hours: number;
  current_life_hours: number;
  tool_status: string;
}

const initialFormData = {
  tool_code: "",
  tool_name: "",
  tool_type_id: "",
  manufacturer: "",
  expected_life_hours: "",
  current_life_hours: "0",
  tool_status: "Available",
};

export default function ToolsTab() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [toolTypes, setToolTypes] = useState<ToolType[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [toolsData, toolTypesData] = await Promise.all([
        getTools(),
        getToolTypes(),
      ]);

      setTools(
        Array.isArray(toolsData)
          ? toolsData
          : toolsData?.data || []
      );

      setToolTypes(
        Array.isArray(toolTypesData)
          ? toolTypesData
          : toolTypesData?.data || []
      );
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to load tools";

      setError(
        typeof message === "string"
          ? message
          : JSON.stringify(message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (tool: Tool) => {
    setEditingId(tool.tool_id);

    setFormData({
      tool_code: tool.tool_code || "",
      tool_name: tool.tool_name || "",
      tool_type_id: String(tool.tool_type_id || ""),
      manufacturer: tool.manufacturer || "",
      expected_life_hours: String(
        tool.expected_life_hours ?? ""
      ),
      current_life_hours: String(
        tool.current_life_hours ?? 0
      ),
      tool_status: tool.tool_status || "Available",
    });

    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(initialFormData);
    setError("");
  };

  const validateForm = () => {
    if (!formData.tool_code.trim()) {
      return "Tool code is required";
    }

    if (!formData.tool_name.trim()) {
      return "Tool name is required";
    }

    if (!formData.tool_type_id) {
      return "Please select a tool type";
    }

    if (
      !formData.expected_life_hours ||
      Number(formData.expected_life_hours) <= 0
    ) {
      return "Expected life hours must be greater than 0";
    }

    if (Number(formData.current_life_hours) < 0) {
      return "Current life hours cannot be negative";
    }

    return "";
  };

  const handleSave = async () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      tool_code: formData.tool_code.trim(),
      tool_name: formData.tool_name.trim(),
      tool_type_id: Number(formData.tool_type_id),
      manufacturer: formData.manufacturer.trim(),
      expected_life_hours: Number(
        formData.expected_life_hours
      ),
      current_life_hours: Number(
        formData.current_life_hours || 0
      ),
      tool_status: formData.tool_status,
    };

    try {
      setSaving(true);
      setError("");

      if (editingId !== null) {
        await updateTool(editingId, payload);
        alert("Tool updated successfully");
      } else {
        await createTool(payload);
        alert("Tool added successfully");
      }

      closeModal();
      await loadData();
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to save tool";

      setError(
        typeof message === "string"
          ? message
          : JSON.stringify(message)
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (tool: Tool) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${tool.tool_name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(tool.tool_id);

      await deleteTool(tool.tool_id);

      alert("Tool deleted successfully");

      await loadData();
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to delete tool";

      alert(
        typeof message === "string"
          ? message
          : JSON.stringify(message)
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getToolTypeName = (toolTypeId: number) => {
    const toolType = toolTypes.find(
      (item) =>
        Number(item.tool_type_id) === Number(toolTypeId)
    );

    return toolType?.tool_type_name || `Type ${toolTypeId}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Tools
        </h3>

        <button
          type="button"
          onClick={openAddModal}
          className="rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
        >
          + Add Tool
        </button>
      </div>

      {error && !showModal && (
        <div className="rounded-lg bg-red-500/10 p-3 text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-white">
          Loading Tools...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="min-w-full">
            <thead className="bg-slate-800">
              <tr className="text-left text-slate-200">
                <th className="px-6 py-4">Tool ID</th>
                <th className="px-6 py-4">Tool Code</th>
                <th className="px-6 py-4">Tool Name</th>
                <th className="px-6 py-4">Tool Type</th>
                <th className="px-6 py-4">Life Hours</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tools.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    No tools found.
                  </td>
                </tr>
              ) : (
                tools.map((tool) => (
                  <tr
                    key={tool.tool_id}
                    className="border-t border-slate-800 hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 text-white">
                      {tool.tool_id}
                    </td>

                    <td className="px-6 py-4 text-white">
                      {tool.tool_code}
                    </td>

                    <td className="px-6 py-4 text-white">
                      {tool.tool_name}
                    </td>

                    <td className="px-6 py-4 text-white">
                      {getToolTypeName(tool.tool_type_id)}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {tool.current_life_hours}/
                      {tool.expected_life_hours}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          tool.tool_status === "Available"
                            ? "bg-green-500/20 text-green-400"
                            : tool.tool_status === "Installed"
                              ? "bg-blue-500/20 text-blue-400"
                              : tool.tool_status === "Maintenance"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {tool.tool_status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => openEditModal(tool)}
                          className="text-blue-400 hover:text-blue-300"
                          title="Edit tool"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(tool)}
                          disabled={deletingId === tool.tool_id}
                          className="text-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete tool"
                        >
                          {deletingId === tool.tool_id ? (
                            <span className="text-xs">
                              Deleting...
                            </span>
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-2xl bg-slate-900 p-6">
            <h2 className="mb-4 text-xl text-white">
              {editingId !== null
                ? "Edit Tool"
                : "Add Tool"}
            </h2>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <input
              name="tool_code"
              value={formData.tool_code}
              onChange={handleChange}
              placeholder="Tool Code"
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white"
            />

            <input
              name="tool_name"
              value={formData.tool_name}
              onChange={handleChange}
              placeholder="Tool Name"
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white"
            />

            <select
              name="tool_type_id"
              value={formData.tool_type_id}
              onChange={handleChange}
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white"
            >
              <option value="">Select Tool Type</option>

              {toolTypes.map((type) => (
                <option
                  key={type.tool_type_id}
                  value={type.tool_type_id}
                >
                  {type.tool_type_name}
                </option>
              ))}
            </select>

            <input
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="Manufacturer"
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white"
            />

            <input
              type="number"
              min="1"
              name="expected_life_hours"
              value={formData.expected_life_hours}
              onChange={handleChange}
              placeholder="Expected Life Hours"
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white"
            />

            <input
              type="number"
              min="0"
              name="current_life_hours"
              value={formData.current_life_hours}
              onChange={handleChange}
              placeholder="Current Life Hours"
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white"
            />

            <select
              name="tool_status"
              value={formData.tool_status}
              onChange={handleChange}
              className="mb-4 w-full rounded bg-slate-800 p-2 text-white"
            >
              <option value="Available">Available</option>
              <option value="Installed">Installed</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Retired">Retired</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded bg-slate-700 px-4 py-2 text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                    ? "Update"
                    : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}