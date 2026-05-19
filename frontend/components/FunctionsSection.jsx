export default function FunctionsSection({ functionsData }) {
  return (
    <div className="page-card">
      <div className="page-header">
        <h2>School Functions</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Function</th>
            <th>Date</th>
            <th>Coordinator</th>
            <th>Participants</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {functionsData.map((item) => (
            <tr key={item.function_id}>
              <td>{item.function_name}</td>
              <td>{item.function_date}</td>
              <td>{item.coordinator_name}</td>
              <td>{item.participants_count}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}