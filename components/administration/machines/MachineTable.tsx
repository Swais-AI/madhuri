"use client";

import useMachines from "@/hooks/useMachines";
import { deleteMachine } from "@/services/machineService";
import { Cpu, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface Machine {
  machine_id: number;
  machine_code: string;
  machine_name: string;
  machine_type_id: number;
  machine_type_name?: string;
  manufacturer?: string;
  model_number?: string;
  installation_date?: string | null;
  location?: string;
  status: string;
}

interface MachineType {
  machine_type_id: number;
  machine_type_name: string;
}

interface MachineTableProps {
  machineTypes: MachineType[];
  onEdit: (machine: Machine) => void;
  onDeleteSuccess: () => void;
}

export default function MachineTable({
  machineTypes,
  onEdit,
  onDeleteSuccess,
}: MachineTableProps) {
  const { machines, loading, error } = useMachines();

  const [deletingId, setDeletingId] = useState<number | null>(
    null
  );

  const getMachineTypeName = (machineTypeId: number) => {
    const matchingType = machineTypes.find(
      (type) =>
        Number(type.machine_type_id) ===
        Number(machineTypeId)
    );

    return (
      matchingType?.machine_type_name ||
      `Type ${machineTypeId}`
    );
  };

  const handleEditClick = (machine: Machine) => {
    console.log("Editing machine:", machine);
    onEdit(machine);
  };

  const handleDelete = async (machine: Machine) => {
    console.log("Deleting machine:", machine);

    const confirmed = window.confirm(
      `Are you sure you want to delete "${machine.machine_name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(machine.machine_id);

      await deleteMachine(machine.machine_id);

      alert("Machine deleted successfully");

      onDeleteSuccess();
    } catch (err: any) {
      console.error("Delete machine error:", err);
      console.error(
        "Backend delete response:",
        err?.response?.data
      );

      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to delete machine";

      alert(
        typeof message === "string"
          ? message
          : JSON.stringify(message)
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-white">
        Loading Machines...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
      <table className="min-w-full">
        <thead className="bg-slate-800">
          <tr className="text-left text-slate-200">
            <th className="px-6 py-4">Machine ID</th>
            <th className="px-6 py-4">Machine Name</th>
            <th className="px-6 py-4">Machine Type</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {machines.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className="flex flex-col items-center justify-center py-20">
                  <Cpu
                    size={60}
                    className="text-slate-600"
                  />

                  <h2 className="mt-5 text-2xl font-semibold text-white">
                    No Machines Found
                  </h2>

                  <p className="mt-2 text-slate-400">
                    Add a machine to get started.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            machines.map((machine: Machine) => (
              <tr
                key={machine.machine_id}
                className="border-t border-slate-800 hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 text-white">
                  {machine.machine_id}
                </td>

                <td className="px-6 py-4 text-white">
                  {machine.machine_name}
                </td>

                <td className="px-6 py-4 text-white">
                  {machine.machine_type_name ||
                    getMachineTypeName(
                      machine.machine_type_id
                    )}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      machine.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : machine.status ===
                            "Maintenance"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {machine.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleEditClick(machine)
                      }
                      className="cursor-pointer text-blue-400 hover:text-blue-300"
                      title="Edit machine"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(machine)
                      }
                      disabled={
                        deletingId === machine.machine_id
                      }
                      className="cursor-pointer text-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete machine"
                    >
                      {deletingId === machine.machine_id ? (
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
  );
}