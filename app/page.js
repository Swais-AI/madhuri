"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  const [students, setStudents] = useState([
    {
      id: "S101",
      name: "Ravi Kumar",
      className: "10-A",
      fatherName: "Ramesh Kumar",
      contact: "9876543210",
      email: "ravi@gmail.com",
      status: "Active",
    },
    {
      id: "S102",
      name: "Priya",
      className: "9-B",
      fatherName: "Srinivas",
      contact: "9123456780",
      email: "priya@gmail.com",
      status: "Active",
    },
    {
      id: "S103",
      name: "Arjun",
      className: "8-A",
      fatherName: "Mohan Rao",
      contact: "9988776655",
      email: "arjun@gmail.com",
      status: "Inactive",
    },
  ]);

  const [teachers, setTeachers] = useState([
    {
      id: "T201",
      name: "Mr. Ramesh",
      subject: "Mathematics",
      contact: "9000011111",
      email: "ramesh@sgsschool.com",
      status: "Active",
    },
    {
      id: "T202",
      name: "Mrs. Lakshmi",
      subject: "English",
      contact: "9000022222",
      email: "lakshmi@sgsschool.com",
      status: "Active",
    },
    {
      id: "T203",
      name: "Mr. Suresh",
      subject: "Science",
      contact: "9000033333",
      email: "suresh@sgsschool.com",
      status: "Inactive",
    },
  ]);

  const [attendance, setAttendance] = useState([
    { date: "2026-04-22", name: "Ravi Kumar", role: "Student", status: "Present" },
    { date: "2026-04-22", name: "Priya", role: "Student", status: "Absent" },
    { date: "2026-04-22", name: "Mr. Ramesh", role: "Teacher", status: "Present" },
  ]);

  const [notifications, setNotifications] = useState([
    {
      title: "Exam Schedule Update",
      role: "Students",
      message: "Mid exams will start from Monday.",
    },
    {
      title: "Staff Meeting",
      role: "Teachers",
      message: "Meeting at 4:00 PM in seminar hall.",
    },
    {
      title: "School Reopening",
      role: "All",
      message: "School will reopen on June 10.",
    },
  ]);

  const [studentForm, setStudentForm] = useState({
    id: "",
    name: "",
    className: "",
    fatherName: "",
    contact: "",
    email: "",
    status: "Active",
  });

  const [teacherForm, setTeacherForm] = useState({
    id: "",
    name: "",
    subject: "Mathematics",
    contact: "",
    email: "",
    status: "Active",
  });

  const [attendanceForm, setAttendanceForm] = useState({
    date: "",
    name: "",
    role: "Student",
    status: "Present",
  });

  const [noticeForm, setNoticeForm] = useState({
    title: "",
    role: "All",
    message: "",
  });
  const [progressForm, setProgressForm] = useState({
  id: "",
  studentName: "",
  className: "",
  testName: "",
  english: "",
  telugu: "",
  hindi: "",
  maths: "",
  science: "",
  social: "",
  grade: "",
  status: "Active",
});

  const addStudent = () => {
    if (
      !studentForm.id ||
      !studentForm.name ||
      !studentForm.className ||
      !studentForm.fatherName ||
      !studentForm.contact ||
      !studentForm.email
    ) {
      alert("Please fill all student fields.");
      return;
    }

    setStudents([...students, studentForm]);
    setStudentForm({
      id: "",
      name: "",
      className: "",
      fatherName: "",
      contact: "",
      email: "",
      status: "Active",
    });
  };

  const modifyStudent = () => {
    if (!studentForm.id) {
      alert("Enter Student ID to modify.");
      return;
    }

    const updatedStudents = students.map((student) =>
      student.id === studentForm.id
        ? {
            ...student,
            name: studentForm.name || student.name,
            className: studentForm.className || student.className,
            fatherName: studentForm.fatherName || student.fatherName,
            contact: studentForm.contact || student.contact,
            email: studentForm.email || student.email,
            status: studentForm.status || student.status,
          }
        : student
    );

    setStudents(updatedStudents);
    setStudentForm({
      id: "",
      name: "",
      className: "",
      fatherName: "",
      contact: "",
      email: "",
      status: "Active",
    });
  };

  const softDeleteStudent = () => {
    if (!studentForm.id) {
      alert("Enter Student ID to soft delete.");
      return;
    }

    const updatedStudents = students.map((student) =>
      student.id === studentForm.id
        ? { ...student, status: "Inactive" }
        : student
    );

    setStudents(updatedStudents);
    setStudentForm({
      id: "",
      name: "",
      className: "",
      fatherName: "",
      contact: "",
      email: "",
      status: "Active",
    });
  };

  const addTeacher = () => {
    if (
      !teacherForm.id ||
      !teacherForm.name ||
      !teacherForm.subject ||
      !teacherForm.contact ||
      !teacherForm.email
    ) {
      alert("Please fill all teacher fields.");
      return;
    }

    setTeachers([...teachers, teacherForm]);
    setTeacherForm({
      id: "",
      name: "",
      subject: "Mathematics",
      contact: "",
      email: "",
      status: "Active",
    });
  };

  const modifyTeacher = () => {
    if (!teacherForm.id) {
      alert("Enter Teacher ID to modify.");
      return;
    }

    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === teacherForm.id
        ? {
            ...teacher,
            name: teacherForm.name || teacher.name,
            subject: teacherForm.subject || teacher.subject,
            contact: teacherForm.contact || teacher.contact,
            email: teacherForm.email || teacher.email,
            status: teacherForm.status || teacher.status,
          }
        : teacher
    );

    setTeachers(updatedTeachers);
    setTeacherForm({
      id: "",
      name: "",
      subject: "Mathematics",
      contact: "",
      email: "",
      status: "Active",
    });
  };

  const softDeleteTeacher = () => {
    if (!teacherForm.id) {
      alert("Enter Teacher ID to soft delete.");
      return;
    }

    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === teacherForm.id
        ? { ...teacher, status: "Inactive" }
        : teacher
    );

    setTeachers(updatedTeachers);
    setTeacherForm({
      id: "",
      name: "",
      subject: "Mathematics",
      contact: "",
      email: "",
      status: "Active",
    });
  };

  const addAttendance = () => {
    if (!attendanceForm.date || !attendanceForm.name) {
      alert("Please fill attendance details.");
      return;
    }

    setAttendance([...attendance, attendanceForm]);
    setAttendanceForm({
      date: "",
      name: "",
      role: "Student",
      status: "Present",
    });
  };

  const publishNotice = () => {
    if (!noticeForm.title || !noticeForm.message) {
      alert("Please fill notice title and message.");
      return;
    }

    setNotifications([noticeForm, ...notifications]);
    setNoticeForm({
      title: "",
      role: "All",
      message: "",
    });
  };

  const renderContent = () => {
    if (activeTab === "home") {
      return (
        <>
          <div className="cards">
            <div className="card">
              <h3>Total Students</h3>
              <p>{students.length}</p>
            </div>
            <div className="card">
              <h3>Total Teachers</h3>
              <p>{teachers.length}</p>
            </div>
            <div className="card">
              <h3>Attendance Records</h3>
              <p>{attendance.length}</p>
            </div>
            <div className="card">
              <h3>Notifications</h3>
              <p>{notifications.length}</p>
            </div>
          </div>

          <div className="section">
            <h2>School Overview</h2>
            <p>
              Welcome to <b>SGS School</b> Headmaster Dashboard. Use the menu to manage
              students, teachers, attendance, and notifications.
            </p>
          </div>
        </>
      );
    }

    if (activeTab === "students") {
      return (
        <div className="section">
          <h2>Student Management</h2>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Student ID"
              value={studentForm.id}
              onChange={(e) => setStudentForm({ ...studentForm, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Student Name"
              value={studentForm.name}
              onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Class"
              value={studentForm.className}
              onChange={(e) =>
                setStudentForm({ ...studentForm, className: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Father Name"
              value={studentForm.fatherName}
              onChange={(e) =>
                setStudentForm({ ...studentForm, fatherName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={studentForm.contact}
              onChange={(e) =>
                setStudentForm({ ...studentForm, contact: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email ID"
              value={studentForm.email}
              onChange={(e) =>
                setStudentForm({ ...studentForm, email: e.target.value })
              }
            />
            <select
              value={studentForm.status}
              onChange={(e) =>
                setStudentForm({ ...studentForm, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="button-group">
            <button className="btn add" onClick={addStudent}>Add Student</button>
            <button className="btn edit" onClick={modifyStudent}>Modify Student</button>
            <button className="btn delete" onClick={softDeleteStudent}>Soft Delete Student</button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Father Name</th>
                  <th>Contact Number</th>
                  <th>Email ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.className}</td>
                    <td>{student.fatherName}</td>
                    <td>{student.contact}</td>
                    <td>{student.email}</td>
                    <td className={student.status === "Active" ? "active-text" : "inactive-text"}>
                      {student.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === "teachers") {
      return (
        <div className="section">
          <h2>Teacher Management</h2>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Teacher ID"
              value={teacherForm.id}
              onChange={(e) => setTeacherForm({ ...teacherForm, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Teacher Name"
              value={teacherForm.name}
              onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
            />
            <select
              value={teacherForm.subject}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, subject: e.target.value })
              }
            >
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Science">Science</option>
              <option value="Social">Social</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Telugu">Telugu</option>
              <option value="Hindi">Hindi</option>
            </select>
            <input
              type="text"
              placeholder="Contact Number"
              value={teacherForm.contact}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, contact: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email ID"
              value={teacherForm.email}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, email: e.target.value })
              }
            />
            <select
              value={teacherForm.status}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="button-group">
            <button className="btn add" onClick={addTeacher}>Add Teacher</button>
            <button className="btn edit" onClick={modifyTeacher}>Modify Teacher</button>
            <button className="btn delete" onClick={softDeleteTeacher}>Soft Delete Teacher</button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Contact Number</th>
                  <th>Email ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index}>
                    <td>{teacher.id}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.contact}</td>
                    <td>{teacher.email}</td>
                    <td className={teacher.status === "Active" ? "active-text" : "inactive-text"}>
                      {teacher.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === "attendance") {
      return (
        <div className="section">
          <h2>Attendance Management</h2>

          <div className="form-grid">
            <input
              type="date"
              value={attendanceForm.date}
              onChange={(e) =>
                setAttendanceForm({ ...attendanceForm, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Name"
              value={attendanceForm.name}
              onChange={(e) =>
                setAttendanceForm({ ...attendanceForm, name: e.target.value })
              }
            />
            <select
              value={attendanceForm.role}
              onChange={(e) =>
                setAttendanceForm({ ...attendanceForm, role: e.target.value })
              }
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            <select
              value={attendanceForm.status}
              onChange={(e) =>
                setAttendanceForm({ ...attendanceForm, status: e.target.value })
              }
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
          </div>

          <div className="button-group">
            <button className="btn blue" onClick={addAttendance}>Add Attendance</button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.role}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === "notifications") {
      return (
        <div className="section">
          <h2>Notifications</h2>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Notice Title"
              value={noticeForm.title ?? ""}
              onChange={(e) =>
                setNoticeForm({ ...noticeForm, title: e.target.value })
              }
            />
            <select
              value={noticeForm.role ?? ""}
              onChange={(e) =>
                setNoticeForm({ ...noticeForm, role: e.target.value })
              }
            >
              <option value="All">All</option>
              <option value="Students">Students</option>
              <option value="Teachers">Teachers</option>
            </select>
            <textarea
              placeholder="Enter notice message"
              value={noticeForm.message ?? ""}
              onChange={(e) =>
                setNoticeForm({ ...noticeForm, message: e.target.value })
              }
            />
          </div>

          <div className="button-group">
            <button className="btn blue" onClick={publishNotice}>Publish Notice</button>
          </div>

          <div className="notice-list">
            {notifications.map((notice, index) => (
              <div className="notice-box" key={index}>
                <h4>{notice.title}</h4>
                <p><b>Role:</b> {notice.role}</p>
                <p>{notice.message}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  if (activeTab === "progress") {
  return (
    <div className="section">
      <h2>Student Progress Management</h2>

      <div className="form-grid">
        <input
          type="text"
          placeholder="Progress ID"
          value={progressForm.id ?? ""}
          onChange={(e) => setProgressForm({ ...progressForm, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Student Name"
          value={progressForm.name ?? ""}
          onChange={(e) => setProgressForm({ ...progressForm, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Class"
          value={progressForm.class ?? ""}
          onChange={(e) => setProgressForm({ ...progressForm, class: e.target.value })}
        />

        <select>
          <option value="">Select Test Name</option>
          <option value="PT-1">PT-1</option>
          <option value="PT-2">PT-2</option>
          <option value="Half Yearly">Half Yearly</option>
          <option value="Annual Exam">Annual Exam</option>
        </select>

        <input type="number" placeholder="English Marks" />
        <input type="number" placeholder="Telugu Marks" />
        <input type="number" placeholder="Hindi Marks" />
        <input type="number" placeholder="Mathematics Marks" />
        <input type="number" placeholder="Science Marks" />
        <input type="number" placeholder="Social Marks" />
        <input type="text" placeholder="Grade" />

        <select>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="button-group">
        <button className="btn add">Add Progress</button>
        <button className="btn edit">Modify Progress</button>
        <button className="btn delete">Soft Delete Progress</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Progress ID</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Test Name</th>
              <th>English</th>
              <th>Telugu</th>
              <th>Hindi</th>
              <th>Maths</th>
              <th>Science</th>
              <th>Social</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>P101</td>
              <td>Ravi Kumar</td>
              <td>10-A</td>
              <td>Half Yearly</td>
              <td>85</td>
              <td>80</td>
              <td>78</td>
              <td>90</td>
              <td>88</td>
              <td>82</td>
              <td>A</td>
              <td className="active-text">Active</td>
            </tr>

            <tr>
              <td>P102</td>
              <td>Priya</td>
              <td>9-B</td>
              <td>Annual Exam</td>
              <td>88</td>
              <td>84</td>
              <td>80</td>
              <td>92</td>
              <td>86</td>
              <td>85</td>
              <td>A+</td>
              <td className="active-text">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
    if (activeTab === "functions") {
  return (
    <div className="section">
      <h2>School Functions</h2>

      <div className="form-grid">
        <input type="text" placeholder="Function Title" />
        <input type="date" />
        <textarea placeholder="Function Description"></textarea>
        <input type="file" accept="image/*" />
      </div>

      <button className="btn blue">Add School Function</button>

      <div className="image-grid">
        <div className="image-card">
          <img src="/images/function1.jpg" alt="School Function" />
          <h3>Annual Day</h3>
          <p><b>Date:</b> 2026-04-29</p>
          <p>Students participated in cultural activities.</p>
        </div>
      </div>
    </div>
  );
}

if (activeTab === "tours") {
  return (
    <div className="section">
      <h2>School Tours</h2>

      <div className="form-grid">
        <input type="text" placeholder="Tour Name" />
        <input type="date" />
        <input type="text" placeholder="Place" />
        <textarea placeholder="Tour Details"></textarea>
      </div>

      <button className="btn blue">Add Tour</button>

      <div className="notice-box">
        <h4>Science Museum Visit</h4>
        <p><b>Date:</b> 2026-05-10</p>
        <p><b>Place:</b> Hyderabad</p>
        <p>Educational tour for class 8 to 10 students.</p>
      </div>
    </div>
  );
}
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Headmaster</h2>
        <p>SGS School</p>

        <button className={activeTab === "home" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("home")}>
          Dashboard Home
        </button>
        <button className={activeTab === "students" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("students")}>
          Students
        </button>
        <button className={activeTab === "teachers" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("teachers")}>
          Teachers
        </button>
        <button className={activeTab === "attendance" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("attendance")}>
          Attendance
        </button>
        <button className={activeTab === "notifications" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("notifications")}>
          Notifications
        </button>
        <button className={activeTab === "progress" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("progress")}>
  Progress
</button>

<button className={activeTab === "functions" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("functions")}>
  School Functions
</button>

<button className={activeTab === "tours" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("tours")}>
  Tours
</button>
      </aside>

      <main className="main-content">
        <div className="topbar">
  <div className="welcome-box">Welcome, <b>Headmaster</b></div>

  <h1>
    {activeTab === "home" && "Dashboard Home"}
    {activeTab === "students" && "Students"}
    {activeTab === "teachers" && "Teachers"}
    {activeTab === "attendance" && "Attendance"}
    {activeTab === "notifications" && "Notifications"}
    {activeTab === "progress" && "Progress Report"}
    {activeTab === "functions" && "School Functions"}
    {activeTab === "tours" && "Tours"}
  </h1>
</div>
        

        {renderContent()}
      </main>
    </div>
  );
}
