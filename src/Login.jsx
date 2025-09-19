import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    // saat komponen tampil, langsung fokus ke input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "5758") {
      const loginData = {
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("loginData", JSON.stringify(loginData));

      setIsAuthenticated(true);
      navigate("/");
    } else {
      alert("INVALID KEY PASS");

      // kosongkan input
      setPassword("");

      // fokus ulang ke input
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className=' flex flex-col items-center justify-center w-screen h-screen bg-[#191923] relative '>
      <h1>INSERT KEY PASS TO PROCEED</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center justify-center">

      <input 
         type="password"
         ref={inputRef} // pasang ref untuk auto focus
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       
        className='p-2 border-b border-slate-700   focus:outline-none bg-transparent text-slate-400 text-center' 
      />
     
        <button type="submit"></button>
      </form>
    </div>
  );
}

export default Login;
