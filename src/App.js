import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Impress from "./pages/Impress";
import Home from "./pages/Home";
import Career from "./pages/Career";
import OpenPosition from "./pages/OpenPosition";
import JuniorDigitalGovernance from "./pages/JuniorDigitalGovernance";
import TaskManagerDigital from "./pages/TaskManagerDigital";
import ProjectManagerDIgital from "./pages/ProjectManagerDIgital";
import { useParams } from 'react-router-dom';
import SmartPage from './pages/SmartPage';

function App() {
  const { eventTitle } = useParams(); 
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/PrivacyPolicy" element={<SmartPage />} />
          <Route path="/impress" element={<SmartPage />} />
          <Route path="/:eventTitle" element={<OpenPosition />} />
          <Route path="/Junior-Digital-Governance-Specialist" element={<JuniorDigitalGovernance/>} />
          <Route path="/task-manager-digital-governance" element={<TaskManagerDigital/>} />
          <Route path="/project-manager-digital-governance" element={<ProjectManagerDIgital/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
