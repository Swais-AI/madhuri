"use client";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  const [students, setStudents] = useState([
    {
      id: "S101",
      name: "Ravi Kumar",
      className: "10-A",
      section: "A",
      fatherName: "Ramesh Kumar",
      contact: "9876543210",
      email: "ravi@gmail.com",
      status: "Active",
    },
    {
      id: "S102",
      name: "Priya",
      className: "9-B",
      section: "B",
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
      className: "10",
      section: "A",
      classTeacher: "Yes",
      teachingType: "IIT / JEE",
      contact: "9000011111",
      email: "ramesh@sgsschool.com",
      status: "Active",
    },
    {
      id: "T202",
      name: "Mrs. Lakshmi",
      subject: "English",
      className: "9",
      section: "B",
      classTeacher: "No",
      teachingType: "General",
      contact: "9000022222",
      email: "lakshmi@sgsschool.com",
      status: "Active",
    },
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
  ]);

  const [progressList, setProgressList] = useState([
    {
      id: "P101",
      studentName: "Ravi Kumar",
      className: "10-A",
      testName: "Half Yearly",
      english: "85",
      telugu: "80",
      hindi: "78",
      maths: "90",
      science: "88",
      social: "82",
      grade: "A",
      result: "Pass",
    },
  ]);

  const [schoolFunctions, setSchoolFunctions] = useState([
    {
      title: "Annual Day",
      date: "2026-04-29",
      details: "Students participated in cultural activities.",
      image: "",
    },
  ]);

  const [tours, setTours] = useState([
    {
      title: "Science Museum Visit",
      date: "2026-05-10",
      place: "Hyderabad",
      details: "Educational tour for class 8 to 10 students.",
      image: "",
    },
  ]);

  const [studentForm, setStudentForm] = useState({
    id: "",
    name: "",
    className: "",
    section: "A",
    fatherName: "",
    contact: "",
    email: "",
    status: "Active",
  });

  const [teacherForm, setTeacherForm] = useState({
    id: "",
    name: "",
    subject: "Mathematics",
    className: "",
    section: "A",
    classTeacher: "No",
    teachingType: "General",
    contact: "",
    email: "",
    status: "Active",
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
    testName: "PT-1",
    english: "",
    telugu: "",
    hindi: "",
    maths: "",
    science: "",
    social: "",
    grade: "",
    result: "Pass",
  });

  const [functionForm, setFunctionForm] = useState({
    title: "",
    date: "",
    details: "",
    image: "",
  });

  const [tourForm, setTourForm] = useState({
    title: "",
    date: "",
    place: "",
    details: "",
    image: "",
  });

  const addStudent = () => {
    if (!studentForm.id || !studentForm.name || !studentForm.className || !studentForm.fatherName || !studentForm.contact || !studentForm.email) {
      alert("Please fill all student fields.");
      return;
    }
    setStudents([...students, studentForm]);
    setStudentForm({
      id: "",
      name: "",
      className: "",
      section: "A",
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
    setStudents(
      students.map((student) =>
        student.id === studentForm.id
          ? {
              ...student,
              name: studentForm.name || student.name,
              className: studentForm.className || student.className,
              section: studentForm.section || student.section,
              fatherName: studentForm.fatherName || student.fatherName,
              contact: studentForm.contact || student.contact,
              email: studentForm.email || student.email,
              status: studentForm.status || student.status,
            }
          : student
      )
    );
  };

  const softDeleteStudent = () => {
    if (!studentForm.id) {
      alert("Enter Student ID to soft delete.");
      return;
    }
    setStudents(students.map((student) => (student.id === studentForm.id ? { ...student, status: "Inactive" } : student)));
  };

  const addTeacher = () => {
    if (!teacherForm.id || !teacherForm.name || !teacherForm.subject || !teacherForm.className || !teacherForm.contact || !teacherForm.email) {
      alert("Please fill all teacher fields.");
      return;
    }
    setTeachers([...teachers, teacherForm]);
    setTeacherForm({
      id: "",
      name: "",
      subject: "Mathematics",
      className: "",
      section: "A",
      classTeacher: "No",
      teachingType: "General",
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
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === teacherForm.id
          ? {
              ...teacher,
              name: teacherForm.name || teacher.name,
              subject: teacherForm.subject || teacher.subject,
              className: teacherForm.className || teacher.className,
              section: teacherForm.section || teacher.section,
              classTeacher: teacherForm.classTeacher || teacher.classTeacher,
              teachingType: teacherForm.teachingType || teacher.teachingType,
              contact: teacherForm.contact || teacher.contact,
              email: teacherForm.email || teacher.email,
              status: teacherForm.status || teacher.status,
            }
          : teacher
      )
    );
  };

  const softDeleteTeacher = () => {
    if (!teacherForm.id) {
      alert("Enter Teacher ID to soft delete.");
      return;
    }
    setTeachers(teachers.map((teacher) => (teacher.id === teacherForm.id ? { ...teacher, status: "Inactive" } : teacher)));
  };

  const publishNotice = () => {
    if (!noticeForm.title || !noticeForm.message) {
      alert("Please fill notice title and message.");
      return;
    }
    setNotifications([noticeForm, ...notifications]);
    setNoticeForm({ title: "", role: "All", message: "" });
  };

  const addProgress = () => {
    if (!progressForm.id || !progressForm.studentName || !progressForm.className) {
      alert("Please fill progress details.");
      return;
    }
    setProgressList([...progressList, progressForm]);
    setProgressForm({
      id: "",
      studentName: "",
      className: "",
      testName: "PT-1",
      english: "",
      telugu: "",
      hindi: "",
      maths: "",
      science: "",
      social: "",
      grade: "",
      result: "Pass",
    });
  };

  const addSchoolFunction = () => {
    if (!functionForm.title || !functionForm.date || !functionForm.details) {
      alert("Please fill school function details.");
      return;
    }
    setSchoolFunctions([functionForm, ...schoolFunctions]);
    setFunctionForm({ title: "", date: "", details: "", image: "" });
  };

  const addTour = () => {
    if (!tourForm.title || !tourForm.date || !tourForm.place || !tourForm.details) {
      alert("Please fill tour details.");
      return;
    }
    setTours([tourForm, ...tours]);
    setTourForm({ title: "", date: "", place: "", details: "", image: "" });
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
              <h3>Notifications</h3>
              <p>{notifications.length}</p>
            </div>
            <div className="card">
              <h3>School Functions</h3>
              <p>{schoolFunctions.length}</p>
            </div>
          </div>

          <div className="section">
            <h2>Headmaster Dashboard</h2>
            <p>
              This dashboard allows the Headmaster to efficiently manage students, teachers, academic progress, school functions, tours, and notifications in one place.
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
            <input type="text" placeholder="Student Roll Number" value={studentForm.id} onChange={(e) => setStudentForm({ ...studentForm, id: e.target.value })} />
            <input type="text" placeholder="Student Name" value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} />
            <input type="text" placeholder="Class" value={studentForm.className} onChange={(e) => setStudentForm({ ...studentForm, className: e.target.value })} />
            <select value={studentForm.section} onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </select>
            <input type="text" placeholder="Father Name" value={studentForm.fatherName} onChange={(e) => setStudentForm({ ...studentForm, fatherName: e.target.value })} />
            <input type="text" placeholder="Contact Number" value={studentForm.contact} onChange={(e) => setStudentForm({ ...studentForm, contact: e.target.value })} />
            <input type="email" placeholder="Email ID" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} />
            <select value={studentForm.status} onChange={(e) => setStudentForm({ ...studentForm, status: e.target.value })}>
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
                  <th>Section</th>
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
                    <td>{student.section}</td>
                    <td>{student.fatherName}</td>
                    <td>{student.contact}</td>
                    <td>{student.email}</td>
                    <td className={student.status === "Active" ? "active-text" : "inactive-text"}>{student.status}</td>
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
            <input type="text" placeholder="Teacher ID" value={teacherForm.id} onChange={(e) => setTeacherForm({ ...teacherForm, id: e.target.value })} />
            <input type="text" placeholder="Teacher Name" value={teacherForm.name} onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })} />
            <select value={teacherForm.subject} onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}>
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
            <input type="text" placeholder="Class" value={teacherForm.className} onChange={(e) => setTeacherForm({ ...teacherForm, className: e.target.value })} />
            <select value={teacherForm.section} onChange={(e) => setTeacherForm({ ...teacherForm, section: e.target.value })}>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </select>
            <select value={teacherForm.classTeacher} onChange={(e) => setTeacherForm({ ...teacherForm, classTeacher: e.target.value })}>
              <option value="Yes">Class Teacher - Yes</option>
              <option value="No">Class Teacher - No</option>
            </select>
            
            <input type="text" placeholder="Contact Number" value={teacherForm.contact} onChange={(e) => setTeacherForm({ ...teacherForm, contact: e.target.value })} />
            <input type="email" placeholder="Email ID" value={teacherForm.email} onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })} />
            <select value={teacherForm.status} onChange={(e) => setTeacherForm({ ...teacherForm, status: e.target.value })}>
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
                  <th>Class</th>
                  <th>Section</th>
                  <th>Class Teacher</th>
                  <th>Teaching Type</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index}>
                    <td>{teacher.id}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.className}</td>
                    <td>{teacher.section}</td>
                    <td>{teacher.classTeacher}</td>
                    <td>{teacher.teachingType}</td>
                    <td>{teacher.contact}</td>
                    <td>{teacher.email}</td>
                    <td className={teacher.status === "Active" ? "active-text" : "inactive-text"}>{teacher.status}</td>
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
            <input type="text" placeholder="Notice Title" value={noticeForm.title} onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })} />
            <select value={noticeForm.role} onChange={(e) => setNoticeForm({ ...noticeForm, role: e.target.value })}>
              <option value="All">All</option>
              <option value="Students">Students</option>
              <option value="Teachers">Teachers</option>
            </select>
            <textarea placeholder="Enter notice message" value={noticeForm.message} onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })} />
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
            <input type="text" placeholder="Progress ID" value={progressForm.id} onChange={(e) => setProgressForm({ ...progressForm, id: e.target.value })} />
            <input type="text" placeholder="Student Name" value={progressForm.studentName} onChange={(e) => setProgressForm({ ...progressForm, studentName: e.target.value })} />
            <input type="text" placeholder="Class" value={progressForm.className} onChange={(e) => setProgressForm({ ...progressForm, className: e.target.value })} />
            <select value={progressForm.testName} onChange={(e) => setProgressForm({ ...progressForm, testName: e.target.value })}>
              <option value="PT-1">PT-1</option>
              <option value="PT-2">PT-2</option>
              <option value="Half Yearly">Half Yearly</option>
              <option value="Annual Exam">Annual Exam</option>
            </select>
            <input type="number" placeholder="English Marks" value={progressForm.english} onChange={(e) => setProgressForm({ ...progressForm, english: e.target.value })} />
            <input type="number" placeholder="Telugu Marks" value={progressForm.telugu} onChange={(e) => setProgressForm({ ...progressForm, telugu: e.target.value })} />
            <input type="number" placeholder="Hindi Marks" value={progressForm.hindi} onChange={(e) => setProgressForm({ ...progressForm, hindi: e.target.value })} />
            <input type="number" placeholder="Mathematics Marks" value={progressForm.maths} onChange={(e) => setProgressForm({ ...progressForm, maths: e.target.value })} />
            <input type="number" placeholder="Science Marks" value={progressForm.science} onChange={(e) => setProgressForm({ ...progressForm, science: e.target.value })} />
            <input type="number" placeholder="Social Marks" value={progressForm.social} onChange={(e) => setProgressForm({ ...progressForm, social: e.target.value })} />
            <input type="text" placeholder="Grade" value={progressForm.grade} onChange={(e) => setProgressForm({ ...progressForm, grade: e.target.value })} />
            <select value={progressForm.result} onChange={(e) => setProgressForm({ ...progressForm, result: e.target.value })}>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </div>
          <div className="button-group">
            <button className="btn add" onClick={addProgress}>Add Progress</button>
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
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {progressList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.studentName}</td>
                    <td>{item.className}</td>
                    <td>{item.testName}</td>
                    <td>{item.english}</td>
                    <td>{item.telugu}</td>
                    <td>{item.hindi}</td>
                    <td>{item.maths}</td>
                    <td>{item.science}</td>
                    <td>{item.social}</td>
                    <td>{item.grade}</td>
                    <td className={item.result === "Pass" ? "active-text" : "inactive-text"}>{item.result}</td>
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
            <input type="text" placeholder="Function Title" value={functionForm.title ?? ""} onChange={(e) => setFunctionForm({ ...functionForm, title: e.target.value })} />
            <input type="date" value={functionForm.date ?? ""} onChange={(e) => setFunctionForm({ ...functionForm, date: e.target.value })} />
            <textarea placeholder="Function Description" value={functionForm.details ?? ""} onChange={(e) => setFunctionForm({ ...functionForm, details: e.target.value })} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setFunctionForm({ ...functionForm, image: URL.createObjectURL(file) });
              }}
            />
          </div>
          <button className="btn blue" onClick={addSchoolFunction}>Add School Function</button>
          <div className="image-grid">
            {schoolFunctions.map((item, index) => (
              <div className="image-card" key={index}>
                {item.image ? <img src={item.image} alt={item.title} /> : <div className="image-placeholder">No Image</div>}
                <h3>{item.title}</h3>
                <p><b>Date:</b> {item.date}</p>
                <p>{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === "tours") {
      return (
        <div className="section">
          <h2>School Tours</h2>
          <div className="form-grid">
            <input type="text" placeholder="Tour Name" value={tourForm.title ?? ""} onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })} />
            <input type="date" value={tourForm.date ?? ""} onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })} />
            <input type="text" placeholder="Place" value={tourForm.place ?? ""} onChange={(e) => setTourForm({ ...tourForm, place: e.target.value })} />
            <textarea placeholder="Tour Details" value={tourForm.details ?? ""} onChange={(e) => setTourForm({ ...tourForm, details: e.target.value })} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setTourForm({ ...tourForm, image: URL.createObjectURL(file) });
              }}
            />
          </div>
          <button className="btn blue" onClick={addTour}>Add Tour</button>
          <div className="image-grid">
            {tours.map((tour, index) => (
              <div className="image-card" key={index}>
                {tour.image ? <img src={tour.image} alt={tour.title} /> : <div className="image-placeholder">No Image</div>}
                <h3>{tour.title}</h3>
                <p><b>Date:</b> {tour.date}</p>
                <p><b>Place:</b> {tour.place}</p>
                <p>{tour.details}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Headmaster</h2>
       
        

        <button className={activeTab === "home" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("home")}>Dashboard Home</button>
        <button className={activeTab === "students" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("students")}>Students</button>
        <button className={activeTab === "teachers" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("teachers")}>Teachers</button>
        <button className={activeTab === "notifications" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("notifications")}>Notifications</button>
        <button className={activeTab === "progress" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("progress")}>Progress</button>
        <button className={activeTab === "functions" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("functions")}>School Functions</button>
        <button className={activeTab === "tours" ? "menu-btn active" : "menu-btn"} onClick={() => setActiveTab("tours")}>Tours</button>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div className="welcome-box">
            Welcome, <b>Head Master </b>
            
          </div>
          <h1>
            {activeTab === "home" && "Dashboard Home"}
            {activeTab === "students" && "Students"}
            {activeTab === "teachers" && "Teachers"}
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


