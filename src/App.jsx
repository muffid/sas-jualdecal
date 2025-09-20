import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Body";

const SESSION_KEY = "session";
const SESSION_DURATION = 20 * 60 * 60 * 1000; // 20 jam

// Cek apakah session valid
const isSessionValid = () => {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (!session) return false;

  const now = new Date().getTime();
  return now < session.expiry;
};

// Wrapper route yang butuh login
function PrivateRoute({ children }) {
  return isSessionValid() ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login sessionKey={SESSION_KEY} sessionDuration={SESSION_DURATION} />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home sessionKey={SESSION_KEY} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
