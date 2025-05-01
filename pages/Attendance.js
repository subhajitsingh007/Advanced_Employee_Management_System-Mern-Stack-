import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [formData, setFormData] = useState({ employeeId: '', amount: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSalaryRecords();
  }, []);

  const fetchSalaryRecords = async () => {
    try {
      const response = await axios.get('/api/salary/all');
      setSalaryRecords(response.data);
    } catch (error) {
      console.error('Error fetching salary records:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/salary/update/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('/api/salary/create', formData);
      }
      setFormData({ employeeId: '', amount: '' });
      fetchSalaryRecords();
    } catch (error) {
      console.error('Error submitting salary record:', error);
    }
  };

  const handleEdit = (record) => {
    setFormData({ employeeId: record.employeeId, amount: record.amount });
    setEditingId(record._id);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div style={styles.page}>
      
      {/* Top Navbar */}
      <div style={styles.navbar}>
        <h1 style={styles.heading}>Attendance Dashboard</h1>
        <div>
          <a href="/profile" style={styles.link}>Profile</a>
          <a href="/notifications" style={styles.link}>Notifications</a>
        </div>
      </div>

      {/* Attendance Section */}
      <div style={styles.card}>
        <h2 style={styles.attendanceHeading}>Today's Attendance</h2>
        <p style={styles.attendanceText}>✅ 18/20 Employees Present</p>
        <button style={styles.primaryButton}>Mark Attendance</button>
      </div>

      {/* Salary Management Section */}
      <div style={styles.card}>
        <h2 style={styles.salaryHeading}>{editingId ? 'Update Salary Record' : 'Create Salary Record'}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="amount"
            placeholder="Salary Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.primaryButton}>
            {editingId ? 'Update Salary' : 'Create Salary'}
          </button>
        </form>

        <h3 style={styles.tableHeading}>All Salary Records</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Employee ID</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {salaryRecords.map((record) => (
                <tr key={record._id} style={styles.tr}>
                  <td style={styles.td}>{record.employeeId}</td>
                  <td style={styles.td}>₹{record.amount}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(record)} style={styles.editButton}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

const styles = {
  page: {
    padding: '30px',
    background: 'linear-gradient(135deg, #f3f4f6, #e0eafc)',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
  },
  navbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#ffffff', padding: '20px', borderRadius: '15px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', marginBottom: '25px',
    transition: 'all 0.3s ease'
  },
  heading: { margin: 0, color: '#3f51b5', fontSize: '28px', fontWeight: '600' },
  link: {
    marginLeft: '20px', textDecoration: 'none', color: '#3f51b5',
    fontWeight: '500', fontSize: '18px', transition: 'color 0.3s',
  },
  card: {
    backgroundColor: '#ffffff', padding: '30px', borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)', marginBottom: '40px',
    transition: 'transform 0.3s ease',
  },
  attendanceHeading: { marginBottom: '10px', color: '#2e7d32', fontSize: '24px', fontWeight: '600' },
  attendanceText: { marginBottom: '20px', fontSize: '20px', fontWeight: '400' },
  primaryButton: {
    padding: '12px 30px', backgroundColor: '#3f51b5', color: 'white',
    border: 'none', borderRadius: '10px', fontSize: '16px', cursor: 'pointer',
    fontWeight: '500', transition: 'background-color 0.3s',
  },
  form: {
    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '25px',
    animation: 'fadeIn 0.5s ease',
  },
  input: {
    margin: '10px 0', padding: '12px', borderRadius: '10px', border: '1px solid #ccc',
    width: '48%', fontSize: '16px', boxSizing: 'border-box',
  },
  salaryHeading: { color: '#e65100', fontSize: '24px', fontWeight: '600', marginBottom: '20px' },
  tableHeading: { color: '#3f51b5', fontSize: '22px', marginBottom: '10px' },
  table: {
    width: '100%', borderCollapse: 'collapse', marginTop: '10px',
    fontSize: '16px', backgroundColor: '#f9fafb',
    borderRadius: '10px', overflow: 'hidden',
  },
  th: {
    textAlign: 'left', padding: '14px', backgroundColor: '#e0e0e0',
    fontWeight: '600', fontSize: '16px', color: '#333'
  },
  tr: {
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  },
  td: {
    padding: '12px', borderBottom: '1px solid #ddd',
  },
  editButton: {
    backgroundColor: '#ff9800', color: 'white', padding: '8px 16px',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
    fontWeight: '500', transition: 'background-color 0.3s',
  }
};

export default Attendance;
