import PredictionHistoryHeader from "@/components/prediction-history/PredictionHistoryHeader";
import PredictionHistoryFilters from "@/components/prediction-history/PredictionHistoryFilters";
import PredictionHistoryTable from "@/components/prediction-history/PredictionHistoryTable";

export default function PredictionHistoryPage() {
  return (
    <div className="space-y-6">

      <PredictionHistoryHeader />

      <PredictionHistoryFilters />

      <PredictionHistoryTable />

    </div>
  );
}