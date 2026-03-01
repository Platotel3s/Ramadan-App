import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Login({onLogin}){
  const [username,setUsername]=useState("");
  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-yellow-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
          <FontAwesomeIcon icon={faMoon}/> Ramadhan Login
        </h1>
        <input 
          className="w-full p-2 rounded-xl mb-4" 
          value={username}
          placeholder="Your name kimi no nawa"
          onChange={(e)=>setUsername(e.target.value)}
         />
        <button
          disabled={!username.trim()}
          onClick={()=>onLogin(username)}
          className="w-full bg-green-500 text-white py-2 rounded-xl disabled:opacity-50">
            Masuk
        </button>
      </div>
    </div>
  );
}
