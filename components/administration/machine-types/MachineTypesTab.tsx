"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import {
  createMachineType,
  deleteMachineType,
  getMachineTypes,
  updateMachineType,
} from "@/services/machineTypeService";

interface MachineType {
  machine_type_id: number;
  machine_type_name: string;
  description: string;
}

const initialFormData = {
  machine_type_name: "",
  description: "",
};

export default function MachineTypesTab() {
  const [machineTypes, setMachineTypes] = useState<MachineType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMachineTypes();
  }, []);

  const loadMachineTypes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMachineTypes();

      setMachineTypes(
        Array.isArray(data) ? data : data?.data || []
      );
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to load machine types";

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
    event: React.ChangeEvent<HTMLInputElement>
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

  const openEditModal = (machineType: MachineType) => {
    setEditingId(machineType.machine_type_id);

    setFormData({
      machine_type_name: machineType.machine_type_name || "",
      description: machineType.description || "",
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
    if (!formData.machine_type_name.trim()) {
      return "Machine type name is required";
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
      machine_type_name: formData.machine_type_name.trim(),
      description: formData.description.trim(),
    };

    try {
      setSaving(true);
      setError("");

      if (editingId !== null) {
        await updateMachineType(editingId, payload);
        alert("Machine type updated successfully");
      } else {
        await createMachineType(payload);
        alert("Machine type added successfully");
      }

      closeModal();
      await loadMachineTypes();
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to save machine type";

      setError(
        typeof message === "string"
          ? message
          : JSON.stringify(message)
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (
    machineType: MachineType
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${machineType.machine_type_name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(machineType.machine_type_id);

      await deleteMachineType(
        machineType.machine_type_id
      );

      alert("Machine type deleted successfully");

      await loadMachineTypes();
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to delete machine type";

      alert(
        typeof message === "string"
          ? message
          : JSON.stringify(message)
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Machine Types
        </h3>

        <button
          type="button"
          onClick={openAddModal}
          className="rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
        >
          + Add Machine Type
        </button>
      </div>

      {error && !showModal && (
        <div className="rounded-lg bg-red-500/10 p-3 text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-white">
          Loading Machine Types...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
          <table className="min-w-full">
            <thead className="bg-slate-800">
              <tr className="text-left text-slate-200">
                <th className="px-6 py-4">
                  Machine Type ID
                </th>

                <th className="px-6 py-4">
                  Machine Type Name
                </th>

                <th className="px-6 py-4">
                  Description
                </th>

                <th className="px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {machineTypes.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    No machine types found.
                  </td>
                </tr>
              ) : (
                machineTypes.map((machineType) => (
                  <tr
                    key={machineType.machine_type_id}
                    className="border-t border-slate-800 hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 text-white">
                      {machineType.machine_type_id}
                    </td>

                    <td className="px-6 py-4 text-white">
                      {machineType.machine_type_name}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {machineType.description || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(machineType)
                          }
                          className="text-blue-400 hover:text-blue-300"
                          title="Edit machine type"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(machineType)
                          }
                          disabled={
                            deletingId ===
                            machineType.machine_type_id
                          }
                          className="text-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete machine type"
                        >
                          {deletingId ===
                          machineType.machine_type_id ? (
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
          <div className="w-full max-w-[450px] rounded-2xl bg-slate-900 p-6">
            <h2 className="mb-4 text-xl text-white">
              {editingId !== null
                ? "Edit Machine Type"
                : "Add Machine Type"}
            </h2>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <input
              name="machine_type_name"
              value={formData.machine_type_name}
              onChange={handleChange}
              placeholder="Machine Type Name"
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="mb-4 w-full rounded bg-slate-800 p-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded bg-slate-700 px-4 py-2 text-white hover:bg-slate-600 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
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