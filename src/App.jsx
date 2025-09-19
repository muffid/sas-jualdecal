import { useState,useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Body from './Body'
import Login from './Login'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // cek localStorage apakah ada login yang valid
    const loginData = localStorage.getItem("loginData");
    if (loginData) {
      const { timestamp } = JSON.parse(loginData);
      const now = new Date().getTime();

      // cek apakah masih dalam 24 jam (24 * 60 * 60 * 1000 ms)
      if (now - timestamp < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("loginData"); // expired
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Body /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App
