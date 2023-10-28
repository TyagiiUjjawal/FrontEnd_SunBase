import React from "react";
import Login from "./Components/Login";
import Create from "./Components/create";
import ReactDOM from "react-dom/client";

import Get from "./Components/get";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/get" element={<Get />} />
      </Routes>
    </div>
  );
};

export default App;
