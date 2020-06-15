import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

const API_URL = "http://131.181.190.87:3000";

export default function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const history = useHistory();

  const[token, setToken] = useState();

  //Logic for the outcome of the log in details
  useEffect( ()=>
  {
    if (!token ) {
      setToken(localStorage.getItem("token"));
    } else {
      if (jwt.decode(token) !== null)
      {
        history.push("/stocksearch")
      }
      else{
        setWarning("Error - Incorrect Log In Details");
      }
    }
  }, [token])

  //Handles log in information to generate the token
  function loggingIn() {
        const url = `${API_URL}/user/login`
        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: `${email}`, password: `${password}` })
        })
            .then((res) => res.json())
            .then((res) => {
                localStorage.setItem("token", res.token)
                setToken(res.token)
              
            })
    }

  return(
    <div className="LoginContent">
    <h2>Login</h2>
    
    
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
          onClick={loggingIn}
          >Submit</button>
        </div>

        <div className="logInWarning">
          <h3>{warning}</h3>
        </div>

    </div>
  ) 
}