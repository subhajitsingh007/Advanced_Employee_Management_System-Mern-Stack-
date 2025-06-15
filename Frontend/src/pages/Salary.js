import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Salary = () => {
  const [users, setUsers] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    basicSalary: "",
    bonus: "",
    deductions: "",
    month: "",
  });

  const [editingSalary, setEditingSalary] = useState(null);
  const [editForm, setEditForm] = useState({
    basicSalary: "",
    bonus: "",
    deductions: "",
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/admin/employees", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  const fetchSalaries = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/salary/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setSalaries(res.data.data);
    } catch (err) {
      console.error("Failed to fetch salaries", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSalaries();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/salary/create", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      setForm({
        userId: "",
        basicSalary: "",
        bonus: "",
        deductions: "",
        month: "",
      });
      await fetchSalaries();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating salary record");
    }
  };

  const handleEditClick = (salary) => {
    setEditingSalary(salary._id);
    setEditForm({
      basicSalary: salary.basicSalary,
      bonus: salary.bonus,
      deductions: salary.deductions,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/salary/update/${editingSalary}`,
        {
          basicSalary: Number(editForm.basicSalary),
          bonus: Number(editForm.bonus),
          deductions: Number(editForm.deductions),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setEditingSalary(null);
      setEditForm({ basicSalary: "", bonus: "", deductions: "" });
      await fetchSalaries();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating salary record");
    }
  };

  const totalPaid = salaries.reduce((acc, item) => acc + item.netSalary, 0);
  const totalBonuses = salaries.reduce((acc, item) => acc + item.bonus, 0);
  const totalDeductions = salaries.reduce((acc, item) => acc + item.deductions, 0);

  return (
    <div className="salary-container">
      <style>{`
        .salary-container {
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
          background-color: #f9fafb;
        }

        form {
          margin-bottom: 2rem;
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
          max-width: 600px;
        }

        form label {
          font-weight: bold;
          display: block;
          margin-top: 1rem;
        }

        form input,
        form select {
          width: 100%;
          padding: 10px;
          margin-top: 6px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        form button {
          margin-top: 1rem;
          padding: 10px 20px;
          background-color: #6366f1;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        form button:hover {
          background-color: #4f46e5;
        }

        h2 {
          margin-top: 2rem;
          color: #111827;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          margin-top: 1rem;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 15px rgba(0,0,0,0.05);
        }

        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        th {
          background-color: #f3f4f6;
          color: #374151;
        }

        tr:hover {
          background-color: #f9fafb;
        }

        input[type="number"] {
          padding: 8px;
        }

        .summary {
          margin-top: 1.5rem;
          background: #fff;
          padding: 1rem;
          border-left: 4px solid #4f46e5;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.03);
          max-width: 400px;
        }

        .summary p {
          margin: 6px 0;
          color: #444;
        }

        button {
          margin: 4px 4px 4px 0;
        }
      `}</style>

      <h2>New Salary Entry</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label>Employee</label>
        <select name="userId" value={form.userId} onChange={handleChange} required>
          <option value="">Select Employee</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <label>Basic Salary</label>
        <input type="number" name="basicSalary" value={form.basicSalary} onChange={handleChange} required />

        <label>Bonus</label>
        <input type="number" name="bonus" value={form.bonus} onChange={handleChange} required />

        <label>Deductions</label>
        <input type="number" name="deductions" value={form.deductions} onChange={handleChange} required />

        <label>Month (YYYY-MM)</label>
        <input type="month" name="month" value={form.month} onChange={handleChange} required />

        <button type="submit">Add Salary</button>
      </form>

      <h2>Salary Summary</h2>
      <div className="summary">
        <p><strong>Total Paid:</strong> ₹{totalPaid}</p>
        <p><strong>Total Bonuses:</strong> ₹{totalBonuses}</p>
        <p><strong>Total Deductions:</strong> ₹{totalDeductions}</p>
      </div>

      <h2>Salary Records</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Basic</th>
            <th>Bonus</th>
            <th>Deductions</th>
            <th>Net</th>
            <th>Month</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((s) =>
            editingSalary === s._id ? (
              <tr key={s._id}>
                <td>{s.user?.name || "unknown"}</td>
                <td><input type="number" name="basicSalary" value={editForm.basicSalary} onChange={handleEditChange} /></td>
                <td><input type="number" name="bonus" value={editForm.bonus} onChange={handleEditChange} /></td>
                <td><input type="number" name="deductions" value={editForm.deductions} onChange={handleEditChange} /></td>
                <td>--</td>
                <td>{s.month}</td>
                <td>
                  <button onClick={handleUpdateSubmit}>Save</button>
                  <button onClick={() => setEditingSalary(null)} style={{ background: "#9ca3af", color: "white" }}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={s._id}>
                <td>{s.user?.name || "unknown"}</td>
                <td>₹{s.basicSalary}</td>
                <td>₹{s.bonus}</td>
                <td>₹{s.deductions}</td>
                <td>₹{s.netSalary}</td>
                <td>{s.month}</td>
                <td><button onClick={() => handleEditClick(s)}>Edit</button></td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Salary;
