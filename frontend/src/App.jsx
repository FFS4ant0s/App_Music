import React, { useState } from "react";  // Corrigido: importação do useState
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";  // Corrigido: BrowserRouter (no plural)
import Login from "./pages/Login";  
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const [count, setCount] = useState(0);  // Corrigido: useState foi importado corretamente.

  return (
    <>
      <BrowserRouter>  {/* Corrigido: BrowserRouter (no plural) */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
