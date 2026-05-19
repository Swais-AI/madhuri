export default function ClassTeachersSection({ classTeachers }) {
  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Class Teachers</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Teacher</th>
            <th>Students</th>
            <th>Responsibilities</th>
          </tr>
        </thead>

        <tbody>
          {classTeachers.map((item, index) => (
            <tr key={index}>
              <td>{item.class_name}</td>
              <td>{item.teacher_name}</td>
              <td>{item.total_students}</td>
              <td>{item.responsibilities}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}