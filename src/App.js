// import React, { useEffect, useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
//   useParams
// } from "react-router-dom";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import Impress from "./pages/Impress";
// import Home from "./pages/Home";
// import Career from "./pages/Career";
// import OpenPosition from "./pages/OpenPosition";
// import JuniorDigitalGovernance from "./pages/JuniorDigitalGovernance";
// import TaskManagerDigital from "./pages/TaskManagerDigital";
// import ProjectManagerDIgital from "./pages/ProjectManagerDIgital";
// import SmartPage from './pages/SmartPage';

// function App() {
//   const length = window.location.href.split('/').length-1
//   const eventTitle =window.location.href.split('/')[length]
//   return (
//     <Router>
//       <Routes>
//           <Route path="/" element={<Home />} />
//           {/* <Route path="/home" element={<Home />} /> */}
//           {/* <Route path="/careers" element={<Career />} /> */}
//           <Route path="/PrivacyPolicy" element={<SmartPage />} />
//           <Route path="/impress" element={<SmartPage />} />
//           <Route path="/:eventTitle" element={<Home  Title={eventTitle}/>} />
//           {/* <Route path="/:eventTitle" element={<OpenPosition />} /> */}
//           <Route path="/Junior-Digital-Governance-Specialist" element={<JuniorDigitalGovernance/>} />
//           <Route path="/task-manager-digital-governance" element={<TaskManagerDigital/>} />
//           <Route path="/project-manager-digital-governance" element={<ProjectManagerDIgital/>} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams
} from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Impress from "./pages/Impress";
import Home from "./pages/Home";
import Career from "./pages/Career";
import OpenPosition from "./pages/OpenPosition";
import JuniorDigitalGovernance from "./pages/JuniorDigitalGovernance";
import TaskManagerDigital from "./pages/TaskManagerDigital";
import ProjectManagerDIgital from "./pages/ProjectManagerDIgital";
import SmartPage from './pages/SmartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home Title={"home"}/>} />
        {/* <Route path="/PrivacyPolicy" element={<SmartPage />} />
        <Route path="/impress" element={<SmartPage />} /> */}
        {/* Use useParams to get the eventTitle dynamically */}
        <Route path="/:eventTitle" element={<DynamicHome />} />
        <Route path="/Junior-Digital-Governance-Specialist" element={<JuniorDigitalGovernance />} />
        <Route path="/task-manager-digital-governance" element={<TaskManagerDigital />} />
        <Route path="/project-manager-digital-governance" element={<ProjectManagerDIgital />} />
      </Routes>
    </Router>
  );
}

const DynamicHome = () => {
  // Get the eventTitle dynamically from the URL params
  const { eventTitle } = useParams();
  return <Home Title={eventTitle} />;
};

export default App;

