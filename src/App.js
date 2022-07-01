import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";
import PrivateRoutes from "routers/PrivateRouters";

import Login from "./pages/Login";

import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<PrivateRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
