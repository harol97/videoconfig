import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Revenue } from '@/data/dashboard';

const StudentsTable = () => {
  // Sample data - replace with your actual data source
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      course: "Introduction to Programming",
      enrollmentDate: "2023-09-15",
      status: "Active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Web Development Fundamentals",
      enrollmentDate: "2023-10-02",
      status: "Active"
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex@example.com",
      course: "Data Science Basics",
      enrollmentDate: "2023-08-20",
      status: "Completed"
    }
  ]);

  // Handlers for actions
  const handleEdit = (studentId) => {
    console.log("Edit student:", studentId);
    // Implement your edit logic here
  };

  const handleDelete = (studentId) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
   <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
         <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Perfromance</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>
         <div className="row y-gap-30">
            {Revenue.map((elm, i) => (
              <div key={i} className="col-xl-3 col-md-6">
                <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                  <div>
                    <div className="lh-1 fw-500">{elm.title}</div>
                    <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                      {elm.value}
                    </div>
                    <div className="lh-1 mt-25">
                      <span className="text-purple-1">{elm.new}</span> New Sales
                    </div>
                  </div>
                  <i className={`text-40 ${elm.iconClass} text-purple-1`}></i>
                </div>
              </div>
            ))}
          </div>
    <div className="table-responsive py-30 px-30">
      <table className="table table-bordered table-hover align-middle w-100">
        <thead className="table-light">
          <tr>
            <th>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Name
            </th>
            <th>
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              Email
            </th>
            <th>Course</th>
            <th>Enrollment Date</th>
            <th>Status</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>
                  <a href={`mailto:${student.email}`} className="text-primary">
                    {student.email}
                  </a>
                </td>
                <td>{student.course}</td>
                <td>{student.enrollmentDate}</td>
                <td>
                  <span className={`badge ${
                    student.status === "Active" ? "bg-success" : 
                    student.status === "Completed" ? "bg-primary" : "bg-warning"
                  }`}>
                    {student.status}
                  </span>
                </td>
                {/* <td>
                  <div className="btn-group" role="group">
                    <div className="d-flex">
                      <button
                        className="button -sm -purple-1 new_email text-white me-2"
                        onClick={() => handleEmail(student.email)}
                        title="Send Email"
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </button>
                      <button
                        className="button -sm -purple-1 new_edit text-white me-2"
                        onClick={() => handleEdit(student.id)}
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="button -sm -purple-1 new_delete text-white"
                        onClick={() => handleDelete(student.id)}
                        title="Remove"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted py-3">
                No students enrolled yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default StudentsTable;