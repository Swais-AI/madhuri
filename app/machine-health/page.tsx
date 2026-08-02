import MachineHealthHeader from "@/components/machine-health/MachineHealthHeader";
import MachineHealthFilters from "@/components/machine-health/MachineHealthFilters";
import MachineHealthTable from "@/components/machine-health/MachineHealthTable";

export default function MachineHealthPage() {
  return (
    <div className="space-y-6">
      <MachineHealthHeader />
      <MachineHealthFilters />
      <MachineHealthTable />
    </div>
  );
}