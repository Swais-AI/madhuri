export default function ProgressSection({ progressData }) {
  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Student Progress</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Exam</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Percentage</th>
            <th>Grade</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody>
          {progressData?.map((item) => (
            <tr key={item.marks_id}>
              <td>{item.full_name}</td>
              <td>{item.exam_name}</td>
              <td>{item.subject_name}</td>
              <td>
                {item.marks_obtained} / {item.max_marks}
              </td>
              <td>{item.percentage}%</td>
              <td>{item.grade}</td>
              <td>{item.remarks || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}