import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ankita Singh",
    employeeId: "EMP001",
    email: "ankita.singh@company.com",
    phone: "+91 98765 43210",
    department: "IT",
    role: "Developer",
    joiningDate: "January 15, 2023",
    manager: "Rajesh Kumar",
    address: "123 Tech Street, Bangalore, India",
    emergencyContact: "+91 87654 32109"
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert("Password changed successfully!");
    setShowPasswordModal(false);
  };
  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.header}>
          <div style={styles.avatar}>
            <span style={styles.avatarText}>AS</span>
          </div>
          <div style={styles.headerInfo}>
            <h2 style={styles.name}>Ankita Singh</h2>
            <p style={styles.role}>Developer</p>
          </div>
        </div>
        
        <div style={styles.content}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Full Name:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    style={styles.input}
                  />
                ) : (
                  <span style={styles.value}>{profileData.name}</span>
                )}
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Employee ID:</span>
                <span style={styles.value}>{profileData.employeeId}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Email:</span>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={styles.input}
                  />
                ) : (
                  <span style={styles.value}>{profileData.email}</span>
                )}
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Phone:</span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={styles.input}
                  />
                ) : (
                  <span style={styles.value}>{profileData.phone}</span>
                )}
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Work Information</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Department:</span>
                <span style={styles.value}>{profileData.department}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Role:</span>
                <span style={styles.value}>{profileData.role}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Joining Date:</span>
                <span style={styles.value}>{profileData.joiningDate}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Manager:</span>
                <span style={styles.value}>{profileData.manager}</span>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact Information</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Address:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    style={styles.input}
                  />
                ) : (
                  <span style={styles.value}>{profileData.address}</span>
                )}
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Emergency Contact:</span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    style={styles.input}
                  />
                ) : (
                  <span style={styles.value}>{profileData.emergencyContact}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          {isEditing ? (
            <>
              <button onClick={handleSave} style={styles.saveButton}>💾 Save Changes</button>
              <button onClick={handleEditToggle} style={styles.cancelButton}>❌ Cancel</button>
            </>
          ) : (
            <>
              <button onClick={handleEditToggle} style={styles.editButton}>✏️ Edit Profile</button>
              <button onClick={handlePasswordChange} style={styles.changePasswordButton}>🔒 Change Password</button>
            </>
          )}
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3 style={styles.modalTitle}>Change Password</h3>
              <form onSubmit={handlePasswordSubmit}>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Current Password:</label>
                  <input type="password" required style={styles.modalInput} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>New Password:</label>
                  <input type="password" required style={styles.modalInput} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Confirm New Password:</label>
                  <input type="password" required style={styles.modalInput} />
                </div>
                <div style={styles.modalButtons}>
                  <button type="submit" style={styles.saveButton}>Update Password</button>
                  <button type="button" onClick={() => setShowPasswordModal(false)} style={styles.cancelButton}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    minHeight: "calc(100vh - 100px)",
    overflowY: "auto",
  },
  profileCard: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 30px",
    display: "flex",
    alignItems: "center",
    color: "#fff",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px",
    border: "3px solid rgba(255,255,255,0.3)",
  },
  avatarText: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    fontWeight: "600",
    color: "#fff",
  },
  role: {
    margin: 0,
    fontSize: "16px",
    opacity: 0.9,
    color: "#fff",
  },
  content: {
    padding: "30px",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "20px",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "10px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    background: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: "4px",
  },
  value: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#1f2937",
  },
  footer: {
    padding: "30px",
    background: "#f9fafb",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  editButton: {
    padding: "12px 24px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  changePasswordButton: {
    padding: "12px 24px",
    background: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Profile;