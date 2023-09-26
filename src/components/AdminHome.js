import React, { useState, useEffect } from 'react';

const AdminHome = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [editStudent, setEditStudent] = useState({ student_id: null, name: '', email: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    // Retrieve the list of students from the API
    fetch('http://localhost:8080/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students: ', error));
  };

  const addStudent = () => {
    // Send a POST request to add a new student
    fetch('http://localhost:8080/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents([...students, data]);
        setNewStudent({ name: '', email: '' });
      })
      .catch((error) => console.error('Error adding student: ', error));
  };

  const updateStudent = () => {
    if (students.some((student) => student.email === editStudent.email && student.student_id !== editStudent.student_id)) {
      alert('Email must be unique.');
      return;
    }

    fetch(`http://localhost:8080/students/${editStudent.student_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editStudent),
    })
      .then(() => {
        setStudents(students.map((student) => (student.student_id === editStudent.student_id ? editStudent : student)));
        setEditStudent({ student_id: null, name: '', email: '' });
      })
      .catch((error) => console.error('Error updating student: ', error));
  };

  const deleteStudent = (studentId) => {
    // Send a DELETE request to delete a student
    fetch(`http://localhost:8080/students/${studentId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedStudents = students.filter((student) => student.student_id !== studentId);
        setStudents(updatedStudents);
      })
      .catch((error) => console.error('Error deleting student: ', error));
  };

  return (
    <div>
      <div>
        <h3>Student List</h3>
        <ul>
          {students.map((student) => (
            <li key={student.student_id}>
              {student.name} ({student.email}){' '}
              <button
                type="button"
                onClick={() =>
                  setEditStudent({
                    student_id: student.student_id,
                    name: student.name,
                    email: student.email,
                  })
                }
              >
                Edit
              </button>
              <button type="button" onClick={() => deleteStudent(student.student_id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add Student</h3>
        <input
          type="text"
          placeholder="Student Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Student Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        />
        <button type="button" onClick={addStudent}>
          Add
        </button>
      </div>
      {editStudent.student_id !== null && (
        <div>
          <h3>Edit Student</h3>
          <input
            type="text"
            placeholder="Edit Student Name"
            value={editStudent.name}
            onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Edit Student Email"
            value={editStudent.email}
            onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
          />
          <button type="button" onClick={updateStudent}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
