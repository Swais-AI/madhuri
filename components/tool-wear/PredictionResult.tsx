export default function PredictionResult({ prediction }: any) {
  console.log("Prediction Result Data:", prediction);
const items = [
  {
    label: "Remaining Useful Life",
    value:
      prediction?.remaining_life_hours !== undefined
        ? `${prediction.remaining_life_hours} hrs`
        : "--",
  },
  {
    label: "Wear Percentage",
    value:
      prediction?.wear_percentage !== undefined
        ? `${prediction.wear_percentage}%`
        : "--",
  },
  {
    label: "Health Status",
    value: prediction?.prediction_status ?? "--",
  },
  {
    label: "Confidence Score",
    value:
      prediction?.confidence_score !== undefined
        ? `${prediction.confidence_score}%`
        : "--",
  },
  {
    label: "Predicted Failure Time",
    value: prediction?.failure_time ?? "--",
  },
  {
    label: "Recommended Action",
    value: prediction?.recommended_action ?? "--",
  },
];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Prediction Result
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {items.map((item) => (

          <div
            key={item.label}
            className="rounded-xl border border-slate-800 bg-slate-950 p-5"
          >

            <p className="text-slate-400 text-sm">
              {item.label}
            </p>


            <h3 className="mt-3 text-3xl font-bold text-white">
              {item.value}
            </h3>


          </div>

        ))}

      </div>

    </div>
  );
}