import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const API_URL = "http://131.181.190.87:3000";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  //Handles the creation of a new log in
  function registering()
  {
    const url = `${API_URL}/user/register`
    return fetch(url, {
        method: "POST",
        headers: { accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email: `${email}`, password: `${password}` })
    })
    .then((res) => res.json())
    .then(history.push("/login"))
  }

  return (

    <div className="RegisterContent">
<h2>Register</h2>

<div className="emailInputBox">
  <input 
    id="email" 
    name="email" 
    type="email"
    placeholder="Email" 
    value={email}
    onChange={(event) => {
      setEmail(event.target.value);
    }}
      />
</div>
  

  <div className="passwordInputBox">
  <input 
    id="password" 
    name="password" 
    type="password"
    placeholder="Password" 
    value={password}
    onChange={(event) => {
      setPassword(event.target.value);
    }}
      />

  </div>
  
    
    <div className="submitButton">
      <button 
      onClick={registering}
      >Submit</button>
    </div>
    </div>
    
  );
}