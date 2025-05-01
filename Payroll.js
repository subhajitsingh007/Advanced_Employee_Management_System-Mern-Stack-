import React from 'react';

function Payroll() {
  return (
    <div style={{ backgroundColor: '#f7f8fc', minHeight: '100vh', padding: '2rem' }}>
      
      {/* Top Header */}
      <div style={{
        backgroundColor: 'white', 
        padding: '1rem 2rem', 
        borderRadius: '12px', 
        marginBottom: '2rem',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ margin: 0 }}>Payroll</h2>
        <div>
          <a href="#profile" style={{ marginRight: '1rem', color: '#555', textDecoration: 'none' }}>Profile</a> |
          <a href="#notifications" style={{ marginLeft: '1rem', color: '#555', textDecoration: 'none' }}>Notifications</a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        backgroundColor: 'white', 
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        <h2 style={{ marginBottom: '1rem' }}>💵 Payroll Overview</h2>
        <p style={{ color: '#555', marginBottom: '2rem' }}>
          Manage and track employee salaries, bonuses, and deductions.
        </p>

        {/* Cards Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem' 
        }}>
          
          <div style={{
            backgroundColor: '#e6f7f0',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3>💰 Total Salary Paid</h3>
            <p>₹ 12,50,000</p>
          </div>

          <div style={{
            backgroundColor: '#fff4e6',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3>🎁 Bonuses</h3>
            <p>₹ 1,20,000</p>
          </div>

          <div style={{
            backgroundColor: '#f0f4ff',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3>📉 Deductions</h3>
            <p>₹ 30,000</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Payroll;
