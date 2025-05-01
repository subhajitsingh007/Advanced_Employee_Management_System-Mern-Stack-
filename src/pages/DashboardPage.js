import React, { useState } from "react";
import styled from "styled-components";
import EmployeeManagement from "./EmployeeManagement";
import Attendance from "./Attendance";
import Performance from "./Performance";
import Payroll from "./Payroll";
import Settings from "./SettingsPage"; // Import SettingsPage properly

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #5e57a1;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex-grow: 1;
  background: #f5f6fa;
  padding: 30px;
  overflow-y: auto;
`;

const NavItem = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 10px;
  border-radius: 10px;
  background: ${(props) => (props.active ? "#7d75d0" : "transparent")};

  &:hover {
    background-color: #7d75d0;
  }
`;

const TopBar = styled.div`
  background: #ffffff;
  padding: 15px 30px;
  border-radius: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

// 🚀 Renamed this styled-component


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("EmployeeManagement");

  const renderSection = () => {
    switch (activeSection) {
      case "EmployeeManagement":
        return <EmployeeManagement />;
      case "Attendance":
        return <Attendance />;
      case "Performance":
        return <Performance />;
      case "Payroll":
        return <Payroll />;
      case "Settings":
        return <Settings />; // now using the imported SettingsPage
      default:
        return <EmployeeManagement />;
    }
  };

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        <h2>EMS Dashboard</h2>
        <NavItem
          active={activeSection === "EmployeeManagement"}
          onClick={() => setActiveSection("EmployeeManagement")}
        >
          Employee Management
        </NavItem>
        <NavItem
          active={activeSection === "Attendance"}
          onClick={() => setActiveSection("Attendance")}
        >
          Attendance
        </NavItem>
        <NavItem
          active={activeSection === "Performance"}
          onClick={() => setActiveSection("Performance")}
        >
          Performance
        </NavItem>
        <NavItem
          active={activeSection === "Payroll"}
          onClick={() => setActiveSection("Payroll")}
        >
          Payroll
        </NavItem>
        <NavItem
          active={activeSection === "Settings"}
          onClick={() => setActiveSection("Settings")}
        >
          Settings
        </NavItem>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <TopBar>
          <h3>{activeSection}</h3>
          <div>Profile | Notifications</div>
        </TopBar>

        {renderSection()}
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
