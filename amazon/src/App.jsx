import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
