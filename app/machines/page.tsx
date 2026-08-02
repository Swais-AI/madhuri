import MachineTable from "@/components/administration/machines/MachineTable";

export default function MachinesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Machines
        </h1>
      </div>

      <MachineTable />
    </div>
  );
}