"use client";

import { useState } from "react";

type MachineFormProps = {
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export default function MachineForm({
  onSubmit,
  loading = false,
}: MachineFormProps) {
  const [formData, setFormData] = useState({
    machine_code: "",
    machine_name: "",
    machine_type_id: "",
    manufacturer: "",
    model_number: "",
    installation_date: "",
    location: "",
    status: "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      machine_type_id: Number(formData.machine_type_id),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        name="machine_code"
        placeholder="Machine Code"
        value={formData.machine_code}
        onChange={handleChange}
        className="w-full rounded-lg bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="text"
        name="machine_name"
        placeholder="Machine Name"
        value={formData.machine_name}
        onChange={handleChange}
        className="w-full rounded-lg bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="number"
        name="machine_type_id"
        placeholder="Machine Type ID"
        value={formData.machine_type_id}
        onChange={handleChange}
        className="w-full rounded-lg bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="text"
        name="manufacturer"
        placeholder="Manufacturer"
        value={formData.manufacturer}
        onChange={handleChange}
        className="w-full rounded-lg bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="text"
        name="model_number"
        placeholder="Model Number"
        value={formData.model_number}
        onChange={handleChange}
        className="w-full rounded-lg bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="date"
        name="installation_date"
        value={formData.installation_date}
        onChange={handleChange}
        className="w-full rounded-lg bg-slate-800 p-3 text-white"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full rounded-lg bg-slate-800 p-3 text-white"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full rounded-lg bg-slate-800 p-3 text-white"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Maintenance">Maintenance</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save Machine"}
      </button>
    </form>
  );
}