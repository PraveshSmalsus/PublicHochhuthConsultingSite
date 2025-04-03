
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import Home from "./pages/Home";
import SmartPageEvents from './pages/SmartPageEvents';
import ContactForm from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home Title={"home"}/>} /> 
        <Route path="/contact" element={<ContactForm />} /> 
        <Route path="/SmartPage/:eventTitle*" element={<DynamicSmartPage />} />
        <Route path="/:eventTitle*" element={<DynamicHome />} />
      </Routes>
    </Router>
  );
}
const DynamicSmartPage = () => {
  const { eventTitle } = useParams();
  const decodedTitle = decodeURIComponent(eventTitle);
  return <SmartPageEvents Title={decodedTitle} SmartPage={"SmartPage"}/>;
};
const DynamicHome = () => {
  const { eventTitle } = useParams();
  const decodedTitle = decodeURIComponent(eventTitle);
  return <Home Title={decodedTitle} />;
};

export default App;

