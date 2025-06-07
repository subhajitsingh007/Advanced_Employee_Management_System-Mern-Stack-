import React, { useState,useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
const SettingsContainer = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: background 0.5s, color 0.5s;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const SubTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  background: #5e57a1;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: #4c4590;
  }
`;

const DangerButton = styled(Button)`
  background: #e74c3c;

  &:hover {
    background: #c0392b;
  }
`;

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [message, setMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await axios.get("/api/settings");
      setDarkMode(data.settings.theme === "dark");
      setLanguage(data.settings.language);
      setEmailNotifications(data.settings.notifications?.email);
      setSystemAlerts(data.settings.notifications?.system);
    } catch (error) {
      console.error("Error fetching settings:", error.message);
    }
  };

  const handleSaveSettings = async () => {
  try {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Or however you store it
      },
      body: JSON.stringify({
        theme: darkMode ? "dark" : "light",
        language,
        notifications: {
          email: true, // Set based on checkboxes
          systemAlerts: true,
        },
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Settings saved successfully!");
    } else {
      alert(`❌ Failed to save settings: ${data.message}`);
    }
  } catch (err) {
    console.error("Save settings error:", err);
    alert("⚠️ Could not save settings.");
  }
};

 const handlePasswordChange = async () => {
  if (!currentPassword || !newPassword) {
    setMessage("⚠️ Please fill in all fields.");
    return;
  }

  try {
    const res = await fetch("/api/settings/update-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Password updated successfully!");
    } else {
      setMessage(`❌ ${data.message}`);
    }
  } catch (error) {
    console.error("Password update error:", error);
    setMessage("⚠️ Failed to update password.");
  }
};

  return (
    <SettingsContainer style={{ background: darkMode ? "#2c3e50" : "#ffffff", color: darkMode ? "#ecf0f1" : "#000" }}>
      <Title>Settings</Title>
      <p>Customize your system preferences below.</p>

      <Section>
        <SubTitle>Theme Settings</SubTitle>
        <Label>
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} /> Enable Dark Mode
        </Label>
      </Section>

      <Section>
        <SubTitle>Language</SubTitle>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Bengali</option>
          <option>Spanish</option>
        </select>
      </Section>

      <Section>
        <SubTitle>Change Password</SubTitle>
        <Input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button onClick={handlePasswordChange}>Update Password</Button>
      </Section>

      <Section>
        <SubTitle>Notifications</SubTitle>
        <Label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
          /> Receive Email Notifications
        </Label>
        <Label>
          <input
            type="checkbox"
            checked={systemAlerts}
            onChange={() => setSystemAlerts(!systemAlerts)}
          /> Receive System Alerts
        </Label>
      </Section>

      <Button onClick={handleSaveSettings}>Save Settings</Button>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </SettingsContainer>
  );
};

export default SettingsPage;