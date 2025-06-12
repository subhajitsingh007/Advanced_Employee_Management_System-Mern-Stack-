import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [selectedDept, setSelectedDept] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [details, setDetails] = useState(null);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/department/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });
      setDepartments(res.data.departments);
    } catch (error) {
      toast.error("Failed to load departments");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:8080/api/department/update/${selectedDept}`,
          form,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            withCredentials: true,
          }
        );
        toast.success("Department updated");
      } else {
        await axios.post("http://localhost:8080/api/department/create", form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        });
        toast.success("Department created");
      }
      setForm({ name: "", description: "" });
      setEditMode(false);
      setSelectedDept(null);
      fetchDepartments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving department");
    }
  };

  const handleEdit = (dept) => {
    setForm({ name: dept.name, description: dept.description });
    setSelectedDept(dept._id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/department/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });
      toast.success("Department deleted");
      fetchDepartments();
    } catch (err) {
      toast.error("Error deleting department");
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/department/details/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });
      setDetails(res.data);
    } catch (err) {
      toast.error("Failed to fetch department details");
    }
  };

  useEffect(() => {
    // Comment this out when real API is ready
    setDepartments([
      {
        _id: "1",
        name: "Human Resources",
        description: "Handles employee management and policies.",
      },
      {
        _id: "2",
        name: "Engineering",
        description: "Responsible for product development.",
      },
    ]);
    // fetchDepartments(); // Uncomment when backend is active
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <style>{`
        form {
          display: grid;
          gap: 1rem;
          max-width: 400px;
          margin-bottom: 2rem;
        }
        input, textarea {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 5px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
        .details {
          margin-top: 2rem;
          background: #f9f9f9;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        ul {
          padding-left: 1.5rem;
        }
      `}</style>

      <h2>{editMode ? "Edit Department" : "Create New Department"}</h2>
      <form onSubmit={handleCreateOrUpdate}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <button type="submit">{editMode ? "Update" : "Create"}</button>
      </form>

      <h2>Departments</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Employees</th>
            <th>HRs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id}>
              <td>{dept.name}</td>
              <td>{dept.description}</td>
              <td>
                <button onClick={() => handleViewDetails(dept._id)}>View</button>
              </td>
              <td>
                <button onClick={() => handleViewDetails(dept._id)}>View</button>
              </td>
              <td>
                <button onClick={() => handleEdit(dept)}>Edit</button>
                <button onClick={() => handleDelete(dept._id)} style={{ marginLeft: "0.5rem", backgroundColor: "#dc3545" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {details && (
        <div className="details">
          <h3>Details for {details.department.name}</h3>
          <p><strong>Description:</strong> {details.department.description}</p>
          <p><strong>Employees:</strong></p>
          <ul>
            {details.employees.map(emp => (
              <li key={emp._id}>{emp.name} - {emp.email}</li>
            ))}
          </ul>
          <p><strong>Human Resources:</strong></p>
          <ul>
            {details.humanResources.map(hr => (
              <li key={hr._id}>{hr.name} - {hr.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Department;
