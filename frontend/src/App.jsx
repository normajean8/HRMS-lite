import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [attendanceForm, setAttendanceForm] = useState({
    employee_id: "",
    date: "",
    status: "Present"
  });

  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: ""
  });

  /* ---------------- EMPLOYEES ---------------- */

  const loadEmployees = async () => {
  try {
    const res = await api.get("/employees");
    console.log("Employees:", res.data);
    setEmployees(res.data || []);
  } catch (err) {
    console.error("Failed to load employees", err);
    setEmployees([]);
  }
};


  useEffect(() => {
    loadEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`);
    loadEmployees();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    await api.post("/employees", form);

    setForm({
      employee_id: "",
      name: "",
      email: "",
      department: ""
    });

    loadEmployees();
  };

  /* ---------------- ATTENDANCE ---------------- */

  const loadAttendance = async (empId) => {
    if (!empId) return;
    const res = await api.get(`/attendance/${empId}`);
    setAttendance(res.data);
  };

  const markAttendance = async (e) => {
    e.preventDefault();
    await api.post("/attendance", attendanceForm);
    loadAttendance(attendanceForm.employee_id);
  };

  /* ---------------- UI ---------------- */

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "auto",
        fontFamily: "Arial"
      }}
    >
      <h1>HRMS Lite v2</h1>

      {/* Add Employee */}
      <h2>Add Employee</h2>

      <form onSubmit={addEmployee}>
        <input
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button style={{ padding: "8px 15px" }} type="submit">
          Add Employee
        </button>
      </form>

      {/* Attendance */}
      <h2>Mark Attendance</h2>

      <form onSubmit={markAttendance}>
        <select
  value={attendanceForm.employee_id}
  onChange={(e) => {
    const empId = e.target.value;

    setAttendanceForm({
      ...attendanceForm,
      employee_id: empId
    });

    loadAttendance(empId);
  }}
  required
>
  <option value="">Select Employee</option>

  {employees.length > 0 &&
    employees.map((emp) => (
      <option key={emp.id} value={emp.employee_id}>
        {emp.name}
      </option>
    ))}
</select>


        <br /><br />

        <input
          type="date"
          onChange={(e) =>
            setAttendanceForm({
              ...attendanceForm,
              date: e.target.value
            })
          }
          required
        />

        <br /><br />

        <select
          onChange={(e) =>
            setAttendanceForm({
              ...attendanceForm,
              status: e.target.value
            })
          }
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <br /><br />

        <button type="submit">Mark Attendance</button>
      </form>

      <h3>Attendance Records</h3>

      <ul>
        {attendance.map((a) => (
          <li key={a.id}>
            {a.date} - {a.status}
          </li>
        ))}
      </ul>

      {/* Employee Table */}
      <h2>Employees</h2>

      {employees.length === 0 ? (
        <p>No employees yet</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button onClick={() => deleteEmployee(emp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
