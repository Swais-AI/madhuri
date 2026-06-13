"use client";

import { useMemo, useState } from "react";

export default function ProgressSection({ progressData = [] }) {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudentKey, setSelectedStudentKey] = useState("");

  const classTabs = useMemo(() => {
    return [
      ...new Set(
        progressData
          .filter((item) => item.class_name && item.section_name)
          .map((item) => `${item.class_name} - Section ${item.section_name}`)
      ),
    ];
  }, [progressData]);

  const classData = progressData.filter(
    (item) => `${item.class_name} - Section ${item.section_name}` === selectedClass
  );

  const students = [
    ...new Map(
      classData.map((item) => [item.student_id || item.full_name, item])
    ).values(),
  ];

  const selectedStudent = students.find(
    (student) => String(student.student_id || student.full_name) === selectedStudentKey
  );

  const studentRecords = selectedStudent
    ? classData.filter(
        (item) =>
          (item.student_id && item.student_id === selectedStudent.student_id) ||
          item.full_name === selectedStudent.full_name
      )
    : [];

  const examNames = [
    ...new Set(studentRecords.map((item) => item.exam_name).filter(Boolean)),
  ];

  const subjects = [
    ...new Set(studentRecords.map((item) => item.subject_name).filter(Boolean)),
  ];

  const getAverage = () => {
    if (studentRecords.length === 0) return "0.00";
    const total = studentRecords.reduce(
      (sum, item) => sum + Number(item.percentage || 0),
      0
    );
    return (total / studentRecords.length).toFixed(2);
  };

  const getBestSubject = () => {
    if (studentRecords.length === 0) return "-";

    const subjectTotals = {};

    studentRecords.forEach((item) => {
      if (!item.subject_name) return;

      if (!subjectTotals[item.subject_name]) {
        subjectTotals[item.subject_name] = { total: 0, count: 0 };
      }

      subjectTotals[item.subject_name].total += Number(item.percentage || 0);
      subjectTotals[item.subject_name].count += 1;
    });

    let bestSubject = "-";
    let bestAverage = -1;

    Object.entries(subjectTotals).forEach(([subject, data]) => {
      const average = data.total / data.count;
      if (average > bestAverage) {
        bestAverage = average;
        bestSubject = subject;
      }
    });

    return bestSubject;
  };

  const getMarks = (subject, exam) => {
    const record = studentRecords.find(
      (item) => item.subject_name === subject && item.exam_name === exam
    );

    if (!record) return "-";

    return record.marks_obtained ?? "-";
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <h2>Student Progress</h2>
      </div>

      <div className="progress-breadcrumb">
        Progress
        {selectedClass && (
          <>
            <span>›</span>
            <button
              onClick={() => {
                setSelectedStudentKey("");
              }}
            >
              {selectedClass}
            </button>
          </>
        )}
        {selectedStudent && (
          <>
            <span>›</span>
            <strong>{selectedStudent.full_name}</strong>
          </>
        )}
      </div>

      {!selectedClass && (
        <div className="progress-class-grid">
          {classTabs.map((className) => {
  const count = progressData.filter(
    (item) =>
      `${item.class_name} - Section ${item.section_name}` === className
  ).reduce((acc, item) => {
    const key = item.student_id || item.full_name;
    return acc.includes(key) ? acc : [...acc, key];
  }, []).length;

  return (
    <button
      key={className}
      className="progress-class-card"
      onClick={() => setSelectedClass(className)}
    >
      <div className="progress-class-name">{className}</div>
      <div className="progress-class-count">{count} Students</div>
    </button>
  );
})}
        </div>
      )}

      {selectedClass && !selectedStudent && (
        <>
          <h3 className="progress-subtitle">
            {selectedClass} • {students.length} Students
          </h3>

          <div className="progress-student-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.student_id || student.full_name}
                    onClick={() =>
                      setSelectedStudentKey(
                        String(student.student_id || student.full_name)
                      )
                    }
                    className="clickable-row"
                  >
                    <td>{student.roll_no || "-"}</td>
                    <td>{student.full_name || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {selectedStudent && (
        <>
          <div className="progress-summary-grid">
            <div className="progress-summary-card">
              <span>Student</span>
              <strong>{selectedStudent.full_name || "-"}</strong>
            </div>

            <div className="progress-summary-card">
              <span>Overall Performance</span>
              <strong>{getAverage()}%</strong>
            </div>

            <div className="progress-summary-card">
              <span>Best Subject</span>
              <strong>{getBestSubject()}</strong>
            </div>

            <div className="progress-summary-card">
              <span>Exams Taken</span>
              <strong>{examNames.length}</strong>
            </div>
          </div>

          <div className="progress-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  {examNames.map((exam) => (
                    <th key={exam}>{exam}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    {examNames.map((exam) => (
                      <td key={`${subject}-${exam}`}>{getMarks(subject, exam)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}