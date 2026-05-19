export default function StudentsSection({ students }) {
  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Students Management</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Admission No</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Parent</th>
            <th>Mobile</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.admission_no}</td>
              <td>{student.full_name}</td>
              <td>{student.class_name}</td>
              <td>{student.section}</td>
              <td>{student.parent_name}</td>
              <td>{student.mobile_no}</td>
              <td>{student.email_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}