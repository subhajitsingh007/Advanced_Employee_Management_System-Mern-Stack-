import React, { useState, useEffect } from 'react';

function Performance() {
  // Sample employee data with performance metrics
  const [employees] = useState([
    {
      id: 1,
      name: 'Ankita Singh',
      department: 'Engineering',
      tasksCompleted: 28,
      tasksAssigned: 32,
      qualityScore: 92,
      attendanceRate: 96,
      deadlinesMet: 26,
      peerRating: 4.5,
      supervisorRating: 4.7,
      trainingHours: 40,
      innovationScore: 85
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      department: 'Marketing',
      tasksCompleted: 22,
      tasksAssigned: 28,
      qualityScore: 88,
      attendanceRate: 92,
      deadlinesMet: 20,
      peerRating: 4.2,
      supervisorRating: 4.3,
      trainingHours: 35,
      innovationScore: 78
    },
    {
      id: 3,
      name: 'Priya Sharma',
      department: 'Sales',
      tasksCompleted: 35,
      tasksAssigned: 38,
      qualityScore: 90,
      attendanceRate: 98,
      deadlinesMet: 33,
      peerRating: 4.6,
      supervisorRating: 4.8,
      trainingHours: 45,
      innovationScore: 88
    },
    {
      id: 4,
      name: 'Amit Patel',
      department: 'HR',
      tasksCompleted: 18,
      tasksAssigned: 24,
      qualityScore: 85,
      attendanceRate: 90,
      deadlinesMet: 16,
      peerRating: 4.0,
      supervisorRating: 4.1,
      trainingHours: 30,
      innovationScore: 72
    }
  ]);

  const [performanceData, setPerformanceData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Performance calculation logic
  const calculatePerformance = (employee) => {
    const completionRate = (employee.tasksCompleted / employee.tasksAssigned) * 100;
    const deadlinePerformance = (employee.deadlinesMet / employee.tasksCompleted) * 100;
    
    // Weighted performance score calculation
    const weights = {
      completion: 0.25,
      quality: 0.20,
      attendance: 0.15,
      deadline: 0.15,
      peer: 0.10,
      supervisor: 0.10,
      innovation: 0.05
    };

    const performanceScore = (
      (completionRate * weights.completion) +
      (employee.qualityScore * weights.quality) +
      (employee.attendanceRate * weights.attendance) +
      (deadlinePerformance * weights.deadline) +
      ((employee.peerRating / 5) * 100 * weights.peer) +
      ((employee.supervisorRating / 5) * 100 * weights.supervisor) +
      (employee.innovationScore * weights.innovation)
    );

    return {
      ...employee,
      completionRate: Math.round(completionRate),
      deadlinePerformance: Math.round(deadlinePerformance),
      overallScore: Math.round(performanceScore),
      grade: getPerformanceGrade(performanceScore),
      trend: getTrend(performanceScore)
    };
  };

  const getPerformanceGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'C+';
    if (score >= 65) return 'C';
    return 'D';
  };

  const getTrend = (score) => {
    if (score >= 85) return '📈';
    if (score >= 75) return '➡️';
    return '📉';
  };

  // Calculate performance data on component mount
  useEffect(() => {
    const calculatedData = employees.map(calculatePerformance);
    setPerformanceData(calculatedData);
  }, [employees]);

  // Find top performer and calculate averages
  const topPerformer = performanceData.reduce((prev, current) => 
    (prev.overallScore > current.overallScore) ? prev : current, {});

  const averageCompletion = Math.round(
    performanceData.reduce((sum, emp) => sum + emp.completionRate, 0) / performanceData.length
  );

  const pendingReviews = performanceData.filter(emp => emp.overallScore < 80).length;

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  };

  const employeeCardStyle = {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

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
        <h2 style={{ margin: 0 }}>Performance Dashboard</h2>
        <div>
          <a href="#profile" style={{ marginRight: '1rem', color: '#555', textDecoration: 'none' }}>Profile</a>
          |
          <a href="#notifications" style={{ marginLeft: '1rem', color: '#555', textDecoration: 'none' }}>Notifications</a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '16px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
      }}>
        <h2 style={{ marginBottom: '1rem' }}>📊 Performance Overview</h2>
        <p style={{ color: '#555', marginBottom: '2rem' }}>
          Comprehensive employee performance analysis with real-time calculations.
        </p>

        {/* Summary Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ ...cardStyle, backgroundColor: '#f0f4ff' }}>
            <h3>🎯 Top Performer</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {topPerformer.name || 'Loading...'}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Score: {topPerformer.overallScore}% ({topPerformer.grade})
            </p>
          </div>

          <div style={{ ...cardStyle, backgroundColor: '#fff4e6' }}>
            <h3>📈 Avg Completion Rate</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {averageCompletion || 0}%
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Across all employees
            </p>
          </div>

          <div style={{ ...cardStyle, backgroundColor: '#e6f7f0' }}>
            <h3>📝 Needs Review</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {pendingReviews} Employees
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Performance below 80%
            </p>
          </div>
        </div>

        {/* Employee Performance List */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Employee Performance Rankings</h3>
            {performanceData
              .sort((a, b) => b.overallScore - a.overallScore)
              .map((employee, index) => (
                <div 
                  key={employee.id}
                  style={{
                    ...employeeCardStyle,
                    backgroundColor: selectedEmployee?.id === employee.id ? '#f0f4ff' : 'white',
                    border: selectedEmployee?.id === employee.id ? '2px solid #4CAF50' : '1px solid #eee'
                  }}
                  onClick={() => setSelectedEmployee(employee)}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#333' }}>
                        #{index + 1} {employee.name}
                      </h4>
                      <p style={{ margin: '0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                        {employee.department}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        color: employee.overallScore >= 85 ? '#4CAF50' : employee.overallScore >= 75 ? '#FF9800' : '#f44336'
                      }}>
                        {employee.overallScore}% {employee.trend}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        Grade: {employee.grade}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Detailed Performance View */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>
              {selectedEmployee ? `${selectedEmployee.name}'s Performance` : 'Select an Employee'}
            </h3>
            {selectedEmployee ? (
              <div style={{ 
                backgroundColor: '#f9f9f9', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #eee'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Performance Metrics</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <strong>Task Completion:</strong> {selectedEmployee.completionRate}%
                      <div style={{ 
                        backgroundColor: '#e0e0e0', 
                        height: '8px', 
                        borderRadius: '4px', 
                        overflow: 'hidden',
                        marginTop: '4px'
                      }}>
                        <div style={{ 
                          backgroundColor: '#4CAF50', 
                          width: `${selectedEmployee.completionRate}%`, 
                          height: '100%' 
                        }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <strong>Quality Score:</strong> {selectedEmployee.qualityScore}%
                      <div style={{ 
                        backgroundColor: '#e0e0e0', 
                        height: '8px', 
                        borderRadius: '4px', 
                        overflow: 'hidden',
                        marginTop: '4px'
                      }}>
                        <div style={{ 
                          backgroundColor: '#2196F3', 
                          width: `${selectedEmployee.qualityScore}%`, 
                          height: '100%' 
                        }}></div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <strong>Attendance:</strong> {selectedEmployee.attendanceRate}%
                    </div>
                    <div>
                      <strong>Deadline Performance:</strong> {selectedEmployee.deadlinePerformance}%
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <strong>Peer Rating:</strong> {selectedEmployee.peerRating}/5 ⭐
                    </div>
                    <div>
                      <strong>Supervisor Rating:</strong> {selectedEmployee.supervisorRating}/5 ⭐
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <strong>Training Hours:</strong> {selectedEmployee.trainingHours}h
                    </div>
                    <div>
                      <strong>Innovation Score:</strong> {selectedEmployee.innovationScore}%
                    </div>
                  </div>
                </div>

                <div style={{ 
                  backgroundColor: selectedEmployee.overallScore >= 85 ? '#e8f5e8' : selectedEmployee.overallScore >= 75 ? '#fff8e1' : '#ffebee',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Overall Performance Score</h4>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold',
                    color: selectedEmployee.overallScore >= 85 ? '#4CAF50' : selectedEmployee.overallScore >= 75 ? '#FF9800' : '#f44336'
                  }}>
                    {selectedEmployee.overallScore}%
                  </div>
                  <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
                    Grade: {selectedEmployee.grade} {selectedEmployee.trend}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: '#f9f9f9', 
                padding: '2rem', 
                borderRadius: '12px',
                textAlign: 'center',
                color: '#666'
              }}>
                <p>Click on an employee from the list to view detailed performance metrics.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
