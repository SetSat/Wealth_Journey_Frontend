import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import SignUpPage from "./components/SignUpPage";
import Interface from "./components/Interface";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Income from "./components/Income";
import Expense from "./components/Expense";
import { loginStatus } from "./Redux/authSlice";

function App() {
  const isLoggedIn = useSelector(loginStatus);

  return (
    <div>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Interface />} />}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/signup" element={<SignUpPage />} />}
        {isLoggedIn && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="landingpage" />} />
            <Route path="landingpage" element={<LandingPage />} />
            <Route path="income" element={<Income />} />
            <Route path="expense" element={<Expense />} />
          </Route>
        )}
        <Route path="*" element={<Interface />} />
      </Routes>
    </div>
  );
}

export default App;
