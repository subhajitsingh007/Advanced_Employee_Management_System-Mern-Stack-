import React, { useState } from 'react';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample employee data
  const employees = [
    { id: 1, name: 'Ankita Singh', department: 'HR', email: 'ankita@example.com' },
    { id: 2, name: 'Santanu Mondal', department: 'Engineering', email: 'santanu@example.com' },
    { id: 3, name: 'Subhajit Singh', department: 'Finance', email: 'subhajit@example.com' },
    { id: 4, name: 'Rahima Khatun', department: 'Marketing', email: 'rahima@example.com' },
    { id: 5, name: 'Arga Dutta', department: 'Sales', email: 'argha@example.com' },
  ];

  // Filter employees based on search input
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f7f8fc', minHeight: '90vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#333' }}>Employee Records</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginTop: '10px'
          }}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px' }}>
          <thead style={{ backgroundColor: '#e0e0e0' }}>
            <tr>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Department</th>
              <th style={tableHeaderStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={tableCellStyle}>{emp.id}</td>
                  <td style={tableCellStyle}>{emp.name}</td>
                  <td style={tableCellStyle}>{emp.department}</td>
                  <td style={tableCellStyle}>{emp.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const tableHeaderStyle = {
  padding: '12px 15px',
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#333',
};

const tableCellStyle = {
  padding: '12px 15px',
};

export default EmployeeManagement;
