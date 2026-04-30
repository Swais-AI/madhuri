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
  ]);

  const [attendance, setAttendance] = useState([
    {
      date: "2026-04-22",
      name: "Ravi Kumar",
      role: "Student",
      status: "Present",
    },
  ]);

  const [notifications, setNotifications] = useState([
    {
      title: "Exam Schedule Update",
      role: "Students",
      message: "Mid exams will start from Monday.",
    },
  ]);

  const [progressList, setProgressList] = useState([
    {
      studentName: "Ravi Kumar",
      className: "10-A",
      subject: "Mathematics",
      pt1: "18",
      pt2: "19",
      halfYearly: "75",
      annual: "88",
      total: "200",
      percentage: "90",
      grade: "A+",
      remarks: "Excellent performance",
    },
  ]);

  const [schoolFunctions, setSchoolFunctions] = useState([
    {
      title: "Annual Day",
      date: "2026-04-25",
      description: "Annual day celebration with cultural programs.",
      image: "",
    },
  ]);

  const [tours, setTours] = useState([
    {
      title: "Science Museum Visit",
      date: "2026-05-10",
      place: "Hyderabad",
      description: "Educational tour for students.",
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
  studentName: "",
  className: "",
  subject: "",
  pt1: "",
  pt2: "",
  halfYearly: "",
  annual: "",
  total: "",
  percentage: "",
  grade: "",
  remarks: "",
});

  const [functionForm, setFunctionForm] = useState({
    title: "",
    date: "",
    description: "",
    image: "",
  });

  const [tourForm, setTourForm] = useState({
    title: "",
    date: "",
    place: "",
    description: "",
  });

  const resetStudentForm = () => {
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

  const resetTeacherForm = () => {
    setTeacherForm({
      id: "",
      name: "",
      subject: "Mathematics",
      contact: "",
      email: "",
      status: "Active",
    });
  };

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
    resetStudentForm();
  };

  const modifyStudent = () => {
    if (!studentForm.id) {
      alert("Enter Student ID to modify.");
      return;
    }

    setStudents(
      students.map((student) =>
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
      )
    );

    resetStudentForm();
  };

  const softDeleteStudent = () => {
    if (!studentForm.id) {
      alert("Enter Student ID to soft delete.");
      return;
    }

    setStudents(
      students.map((student) =>
        student.id === studentForm.id
          ? { ...student, status: "Inactive" }
          : student
      )
    );

    resetStudentForm();
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
    resetTeacherForm();
  };

  const modifyTeacher = () => {
    if (!teacherForm.id) {
      alert("Enter Teacher ID to modify.");
      return;
    }

    setTeachers(
      teachers.map((teacher) =>
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
      )
    );

    resetTeacherForm();
  };

  const softDeleteTeacher = () => {
    if (!teacherForm.id) {
      alert("Enter Teacher ID to soft delete.");
      return;
    }

    setTeachers(
      teachers.map((teacher) =>
        teacher.id === teacherForm.id
          ? { ...teacher, status: "Inactive" }
          : teacher
      )
    );

    resetTeacherForm();
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

  const addProgress = () => {
    if (
      !progressForm.studentName ||
      !progressForm.className ||
      !progressForm.subject
    ) {
      alert("Please fill student name, class, and subject.");
      return;
    }

    setProgressList([progressForm, ...progressList]);
    setProgressForm({
      studentName: "",
      className: "",
      subject: "",
      pt1: "",
      pt2: "",
      halfYearly: "",
      annual: "",
      total: "",
      percentage: "",
      grade: "",
      remarks: "",
    });
  };

  const addSchoolFunction = () => {
    if (!functionForm.title || !functionForm.date || !functionForm.description) {
      alert("Please fill function details.");
      return;
    }

    setSchoolFunctions([functionForm, ...schoolFunctions]);
    setFunctionForm({
      title: "",
      date: "",
      description: "",
      image: "",
    });
  };

  const addTour = () => {
    if (!tourForm.title || !tourForm.date || !tourForm.place) {
      alert("Please fill tour details.");
      return;
    }

    setTours([tourForm, ...tours]);
    setTourForm({
      title: "",
      date: "",
      place: "",
      description: "",
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
              Welcome to <b>SGS School</b> Headmaster Dashboard. Use the menu to
              manage students, teachers, attendance, progress, school functions,
              tours, and notifications.
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
              value={studentForm.id ?? ""}
              onChange={(e) =>
                setStudentForm({ ...studentForm, id: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Student Name"
              value={studentForm.name ?? ""}
              onChange={(e) =>
                setStudentForm({ ...studentForm, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Class"
              value={studentForm.className ?? ""}
              onChange={(e) =>
                setStudentForm({ ...studentForm, className: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Father Name"
              value={studentForm.fatherName ?? ""}
              onChange={(e) =>
                setStudentForm({ ...studentForm, fatherName: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Contact Number"
              value={studentForm.contact ?? ""}
              onChange={(e) =>
                setStudentForm({ ...studentForm, contact: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email ID"
              value={studentForm.email ?? ""}
              onChange={(e) =>
                setStudentForm({ ...studentForm, email: e.target.value })
              }
            />

            <select
              value={studentForm.status ?? "Active"}
              onChange={(e) =>
                setStudentForm({ ...studentForm, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="button-group">
            <button className="btn add" onClick={addStudent}>
              Add Student
            </button>
            <button className="btn edit" onClick={modifyStudent}>
              Modify Student
            </button>
            <button className="btn delete" onClick={softDeleteStudent}>
              Soft Delete Student
            </button>
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
                    <td
                      className={
                        student.status === "Active"
                          ? "active-text"
                          : "inactive-text"
                      }
                    >
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
              value={teacherForm.id ?? ""}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, id: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Teacher Name"
              value={teacherForm.name ?? ""}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, name: e.target.value })
              }
            />

            <select
              value={teacherForm.subject ?? "Mathematics"}
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
              value={teacherForm.contact ?? ""}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, contact: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email ID"
              value={teacherForm.email ?? ""}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, email: e.target.value })
              }
            />

            <select
              value={teacherForm.status ?? "Active"}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="button-group">
            <button className="btn add" onClick={addTeacher}>
              Add Teacher
            </button>
            <button className="btn edit" onClick={modifyTeacher}>
              Modify Teacher
            </button>
            <button className="btn delete" onClick={softDeleteTeacher}>
              Soft Delete Teacher
            </button>
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
                    <td
                      className={
                        teacher.status === "Active"
                          ? "active-text"
                          : "inactive-text"
                      }
                    >
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
              value={attendanceForm.date ?? ""}
              onChange={(e) =>
                setAttendanceForm({
                  ...attendanceForm,
                  date: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Name"
              value={attendanceForm.name ?? ""}
              onChange={(e) =>
                setAttendanceForm({
                  ...attendanceForm,
                  name: e.target.value,
                })
              }
            />

            <select
              value={attendanceForm.role ?? "Student"}
              onChange={(e) =>
                setAttendanceForm({
                  ...attendanceForm,
                  role: e.target.value,
                })
              }
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>

            <select
              value={attendanceForm.status ?? "Present"}
              onChange={(e) =>
                setAttendanceForm({
                  ...attendanceForm,
                  status: e.target.value,
                })
              }
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Half Day">Half Day</option>
            </select>
          </div>

          <div className="button-group">
            <button className="btn blue" onClick={addAttendance}>
              Add Attendance
            </button>
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

    if (activeTab === "progress") {
      return (
        <div className="section">
          <h2>Student Progress / Report Card</h2>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Student Name"
              value={progressForm.studentName ?? ""}
              onChange={(e) =>
                setProgressForm({
                  ...progressForm,
                  studentName: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Class"
              value={progressForm.className ?? ""}
              onChange={(e) =>
                setProgressForm({
                  ...progressForm,
                  className: e.target.value,
                })
              }
            />

            <select
              value={progressForm.subject ?? ""}
              onChange={(e) =>
                setProgressForm({
                  ...progressForm,
                  subject: e.target.value,
                })
              }
            >
              <option value="">Select Subject</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Social">Social</option>
              <option value="Computer Science">Computer Science</option>
            </select>

           <input
  type="text"
  placeholder="PT-1 Marks"
  value={progressForm?.pt1 ?? ""}
  onChange={(e) =>
    setProgressForm((prev) => ({
      ...prev,
      pt1: e.target.value,
    }))
  }
/>

           <input
  type="text"
  placeholder="PT-2 Marks"
  value={progressForm?.pt2 ?? ""}
  onChange={(e) =>
    setProgressForm((prev) => ({
      ...prev,
      pt2: e.target.value,
    }))
  }
/>
            <input
              type="number"
              placeholder="Half Yearly"
              value={progressForm.halfYearly ?? ""}
              onChange={(e) =>
                setProgressForm({
                  ...progressForm,
                  halfYearly: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Annual Exam"
              value={progressForm.annual ?? ""}
              onChange={(e) =>
                setProgressForm({ ...progressForm, annual: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Total"
              value={progressForm.total ?? ""}
              onChange={(e) =>
                setProgressForm({ ...progressForm, total: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Percentage"
              value={progressForm.percentage ?? ""}
              onChange={(e) =>
                setProgressForm({
                  ...progressForm,
                  percentage: e.target.value,
                })
              }
            />

            <select
              value={progressForm.grade ?? ""}
              onChange={(e) =>
                setProgressForm({ ...progressForm, grade: e.target.value })
              }
            >
              <option value="">Select Grade</option>
              <option value="A+">A+ 91-100</option>
              <option value="A">A 81-90</option>
              <option value="B1">B1 71-80</option>
              <option value="B2">B2 61-70</option>
              <option value="C1">C1 51-60</option>
              <option value="C2">C2 41-50</option>
              <option value="D">D 33-40</option>
              <option value="E">E Needs Improvement</option>
            </select>

            <input
              type="text"
              placeholder="Remarks"
              value={progressForm.remarks ?? ""}
              onChange={(e) =>
                setProgressForm({ ...progressForm, remarks: e.target.value })
              }
            />
          </div>

          <div className="button-group">
            <button className="btn blue" onClick={addProgress}>
              Add Progress
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>PT-1</th>
                  <th>PT-2</th>
                  <th>Half Yearly</th>
                  <th>Annual</th>
                  <th>Total</th>
                  <th>%</th>
                  <th>Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>

              <tbody>
                {progressList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.studentName}</td>
                    <td>{item.className}</td>
                    <td>{item.subject}</td>
                    <td>{item.pt1}</td>
                    <td>{item.pt2}</td>
                    <td>{item.halfYearly}</td>
                    <td>{item.annual}</td>
                    <td>{item.total}</td>
                    <td>{item.percentage}</td>
                    <td>{item.grade}</td>
                    <td>{item.remarks}</td>
                  </tr>
                ))}
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
  <input
    type="text"
    placeholder="Function Title"
    value={functionForm?.title ?? ""}
    onChange={(e) =>
      setFunctionForm({ ...functionForm, title: e.target.value })
    }
  />

  <input
    type="date"
    value={functionForm?.date ?? ""}
    onChange={(e) =>
      setFunctionForm({ ...functionForm, date: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Description"
    value={functionForm?.description ?? ""}
    onChange={(e) =>
      setFunctionForm({ ...functionForm, description: e.target.value })
    }
  />

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setFunctionForm({
        ...functionForm,
        image: URL.createObjectURL(file),
      });
    }}
  />
</div>
         

          <div className="button-group">
            <button className="btn blue" onClick={addSchoolFunction}>
              Add School Function
            </button>
          </div>

          <div className="image-grid">
            {schoolFunctions.map((item, index) => (
              <div className="image-card" key={index}>
                {item.image ? (
                  <img src={item.image} alt={item.title} />
                ) : (
                  <div className="image-placeholder">No Image</div>
                )}
                <h3>{item.title}</h3>
                <p>
                  <b>Date:</b> {item.date}
                </p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === "tours") {
      return (
        <div className="section">
          <h2>Tours</h2>

          <div className="form-grid">
  <input
    type="text"
    placeholder="Tour Title"
    value={tourForm?.title ?? ""}
    onChange={(e) =>
      setTourForm({ ...tourForm, title: e.target.value })
    }
  />

  <input
    type="date"
    value={tourForm?.date ?? ""}
    onChange={(e) =>
      setTourForm({ ...tourForm, date: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Place"
    value={tourForm?.place ?? ""}
    onChange={(e) =>
      setTourForm({ ...tourForm, place: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Description"
    value={tourForm?.description ?? ""}
    onChange={(e) =>
      setTourForm({ ...tourForm, description: e.target.value })
    }
  />
</div>

          <div className="button-group">
            <button className="btn blue" onClick={addTour}>
              Add Tour
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Tour Title</th>
                  <th>Date</th>
                  <th>Place</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                {tours.map((tour, index) => (
                  <tr key={index}>
                    <td>{tour.title}</td>
                    <td>{tour.date}</td>
                    <td>{tour.place}</td>
                    <td>{tour.description}</td>
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
              value={noticeForm.role ?? "All"}
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
            <button className="btn blue" onClick={publishNotice}>
              Publish Notice
            </button>
          </div>

          <div className="notice-list">
            {notifications.map((notice, index) => (
              <div className="notice-box" key={index}>
                <h4>{notice.title}</h4>
                <p>
                  <b>Role:</b> {notice.role}
                </p>
                <p>{notice.message}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Headmaster</h2>
        <p>SGS School</p>

        <button
          className={activeTab === "home" ? "menu-btn active" : "menu-btn"}
          onClick={() => setActiveTab("home")}
        >
          Dashboard Home
        </button>

        <button
          className={activeTab === "students" ? "menu-btn active" : "menu-btn"}
          onClick={() => setActiveTab("students")}
        >
          Students
        </button>

        <button
          className={activeTab === "teachers" ? "menu-btn active" : "menu-btn"}
          onClick={() => setActiveTab("teachers")}
        >
          Teachers
        </button>

        <button
          className={
            activeTab === "attendance" ? "menu-btn active" : "menu-btn"
          }
          onClick={() => setActiveTab("attendance")}
        >
          Attendance
        </button>

        <button
          className={activeTab === "progress" ? "menu-btn active" : "menu-btn"}
          onClick={() => setActiveTab("progress")}
        >
          Progress
        </button>

        <button
          className={activeTab === "functions" ? "menu-btn active" : "menu-btn"}
          onClick={() => setActiveTab("functions")}
        >
          School Functions
        </button>

        <button
          className={activeTab === "tours" ? "menu-btn active" : "menu-btn"}
          onClick={() => setActiveTab("tours")}
        >
          Tours
        </button>

        <button
          className={
            activeTab === "notifications" ? "menu-btn active" : "menu-btn"
          }
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div className="welcome-box">
            Welcome, <b>Headmaster</b>
          </div>

          <h1>
            {activeTab === "home" && "Dashboard Home"}
            {activeTab === "students" && "Students"}
            {activeTab === "teachers" && "Teachers"}
            {activeTab === "attendance" && "Attendance"}
            {activeTab === "progress" && "Progress"}
            {activeTab === "functions" && "School Functions"}
            {activeTab === "tours" && "Tours"}
            {activeTab === "notifications" && "Notifications"}
          </h1>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}