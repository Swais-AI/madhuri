"use client";

import { useEffect, useState } from "react";
import MachineTable from "./MachineTable";
import {
  addMachine,
  updateMachine,
} from "@/services/machineService";
import { getMachineTypes } from "@/services/machineTypeService";

interface MachineType {
  machine_type_id: number;
  machine_type_name: string;
}

interface Machine {
  machine_id: number;
  machine_code: string;
  machine_name: string;
  machine_type_id: number;
  manufacturer?: string;
  model_number?: string;
  installation_date?: string | null;
  location?: string;
  status: string;
}

const initialFormData = {
  machine_code: "",
  machine_name: "",
  machine_type_id: "",
  manufacturer: "",
  model_number: "",
  installation_date: "",
  location: "",
  status: "Active",
};

export default function MachinesTab() {
  const [showModal, setShowModal] = useState(false);
  const [machineTypes, setMachineTypes] = useState<MachineType[]>([]);
  const [formData, setFormData] = useState(initialFormData);
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");
  const [editingMachineId, setEditingMachineId] =
    useState<number | null>(null);

  useEffect(() => {
    loadMachineTypes();
  }, []);

  const loadMachineTypes = async () => {
    try {
      const data = await getMachineTypes();

      setMachineTypes(
        Array.isArray(data) ? data : data?.data || []
      );
    } catch (err) {
      console.error("Failed to load machine types:", err);
      setError("Unable to load machine types");
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

  const validateForm = () => {
    if (!formData.machine_code.trim()) {
      return "Machine code is required";
    }

    if (!formData.machine_name.trim()) {
      return "Machine name is required";
    }

    if (!formData.machine_type_id) {
      return "Please select a machine type";
    }

    return "";
  };

  const handleEdit = (machine: Machine) => {
    setEditingMachineId(machine.machine_id);

    setFormData({
      machine_code: machine.machine_code || "",
      machine_name: machine.machine_name || "",
      machine_type_id: String(
        machine.machine_type_id || ""
      ),
      manufacturer: machine.manufacturer || "",
      model_number: machine.model_number || "",
      installation_date: machine.installation_date
        ? String(machine.installation_date).split("T")[0]
        : "",
      location: machine.location || "",
      status: machine.status || "Active",
    });

    setError("");
    setShowModal(true);
  };

  const handleSave = async () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      machine_code: formData.machine_code.trim(),
      machine_name: formData.machine_name.trim(),
      machine_type_id: Number(
        formData.machine_type_id
      ),
      manufacturer: formData.manufacturer.trim(),
      model_number: formData.model_number.trim(),
      installation_date:
        formData.installation_date || null,
      location: formData.location.trim(),
      status: formData.status,
    };

    try {
      setSaving(true);
      setError("");

      if (editingMachineId !== null) {
        await updateMachine(
          editingMachineId,
          payload
        );

        alert("Machine updated successfully");
      } else {
        await addMachine(payload);

        alert("Machine added successfully");
      }

      setShowModal(false);
      setFormData(initialFormData);
      setEditingMachineId(null);

      setRefreshKey((previous) => previous + 1);
  } catch (err: any) {
  const message =
    err?.response?.data?.detail ||
    err?.response?.data?.message ||
    "Failed to save machine";

  setError(
    typeof message === "string"
      ? message
      : JSON.stringify(message)
  );
} finally {
  setSaving(false);
}
  };

  const openAddModal = () => {
    setEditingMachineId(null);
    setFormData(initialFormData);
    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMachineId(null);
    setFormData(initialFormData);
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">
          Machines
        </h3>

        <button
          type="button"
          onClick={openAddModal}
          className="rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
        >
          + Add Machine
        </button>
      </div>

      <MachineTable
        key={refreshKey}
        machineTypes={machineTypes}
        onEdit={handleEdit}
        onDeleteSuccess={() => {
          setRefreshKey((previous) => previous + 1);
        }}
      />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-[450px] overflow-y-auto rounded-2xl bg-slate-900 p-6">
            <h2 className="mb-4 text-xl text-white">
              {editingMachineId !== null
                ? "Edit Machine"
                : "Add Machine"}
            </h2>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <input
              name="machine_code"
              value={formData.machine_code}
              onChange={handleChange}
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Machine Code"
            />

            <input
              name="machine_name"
              value={formData.machine_name}
              onChange={handleChange}
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Machine Name"
            />

            <select
              name="machine_type_id"
              value={formData.machine_type_id}
              onChange={handleChange}
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">
                Select Machine Type
              </option>

              {machineTypes.map((type) => (
                <option
                  key={type.machine_type_id}
                  value={type.machine_type_id}
                >
                  {type.machine_type_name}
                </option>
              ))}
            </select>

            <input
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Manufacturer"
            />

            <input
              name="model_number"
              value={formData.model_number}
              onChange={handleChange}
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Model Number"
            />

            <input
              type="date"
              name="installation_date"
              value={formData.installation_date}
              onChange={handleChange}
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mb-3 w-full rounded bg-slate-800 p-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Location"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mb-4 w-full rounded bg-slate-800 p-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

              <option value="Maintenance">
                Maintenance
              </option>
            </select>

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
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingMachineId !== null
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