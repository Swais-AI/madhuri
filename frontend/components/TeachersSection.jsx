export default function TeachersSection({ teachers }) {
  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Teachers Management</h2>
      </div>
     <div className="table-scroll-wrapper">
      <table>
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Role</th>
            <th>Section 1</th>
            <th>Section 2</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {teachers?.map((teacher) => (
            <tr key={teacher.teacher_id}>
              <td>{teacher.teacher_id}</td>
              <td>{teacher.full_name}</td>
              <td>{teacher.subject_name}</td>
              <td>{teacher.role}</td>
              <td>{teacher.section_1 || "-"}</td>
              <td>{teacher.section_2 || "-"}</td>
              <td>{teacher.email_id}</td>
              <td>{teacher.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}