export default function AnalyticsView({ data }) {
  if (!data) return null;

  let parsed = data;

  try {
    if (typeof data === "string") {
      parsed = JSON.parse(data);
    }
  } catch (e) {
    return <pre>{data}</pre>;
  }

  const analysis = parsed.analysis;
  const chartData = parsed.chartData || [];

  return (
    <div style={{ padding: "10px" }}>

      {/* MAIN AI ANALYSIS */}
      <h3>🧠 AI Analysis</h3>

      <div style={{
        background: "#f4f6ff",
        padding: "12px",
        borderRadius: "8px",
        whiteSpace: "pre-wrap"
      }}>
        {analysis || "No analysis available"}
      </div>

      {/* CHART DATA */}
      <h3 style={{ marginTop: "15px" }}>📊 Data Summary</h3>

      {chartData.length > 0 ? (
        <ul>
          {chartData.map((item, i) => (
            <li key={i}>
              {item.label}: {item.value}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "gray" }}>
          No chart data available (backend returned empty dataset)
        </p>
      )}

    </div>
  );
}