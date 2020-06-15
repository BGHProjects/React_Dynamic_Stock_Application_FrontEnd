import React, { useState } from "react";
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");


// navigation links
export default function Nav() {

  function logOut(){
    localStorage.setItem("token", "");
  }

    return (
      <nav>
        <ul>
          <li>
            <Link to="/stocksearch">StockSearch</Link>
          </li>

          {token === "" ? (<li>
            <Link to="/login">Login</Link>
          </li>) : (null)}

          {token === "" ? (
          <li>
            <Link to="/register">Register</Link>
          </li>) : (null) }
          
          

          {token !== "" ? (
            <li>
              <button className="logoutButton" 
              onClick={() => 
              ( logOut())}>Logout</button>
            </li>
          ) : (null)}
          

        </ul>
      </nav>
    );
  }
