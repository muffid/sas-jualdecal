import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SHA1 from "crypto-js/sha1";

export default function Login({ sessionKey, sessionDuration }) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem(sessionKey));
    if (session && new Date().getTime() < session.expiry) {
      navigate("/home");
    }
  }, [navigate, sessionKey]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleLogin = (e) => { 
    e.preventDefault();
    const hashValue = SHA1(password).toString();
    if (hashValue === "c8208aa5a42e432425517bbf8599aab30c4b4d65") {
      const expiry = new Date().getTime() + sessionDuration;
      localStorage.setItem(sessionKey, JSON.stringify({ expiry }));
      navigate("/home");
    } else {
      alert("PIN INVALID");
      setPassword(""); // reset input
    }
  };

  return (
   <div className=' flex flex-col items-center justify-center w-screen h-screen bg-[#191923] relative '>
      <form onSubmit={handleLogin}>
        <h2 className="text-center">INSERT PIN CODE</h2>
        <input
          className="p-2 border-b border-slate-700   focus:outline-none bg-transparent text-slate-400 text-center"
          type="password"
          ref={inputRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => inputRef.current && inputRef.current.focus()} // kunci fokus
        />
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>
        
        </button>
      </form>
    </div>
  );
}
