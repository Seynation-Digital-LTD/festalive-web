import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Email from "./Components/Email/Email";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/email-listing" element={<Email />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
