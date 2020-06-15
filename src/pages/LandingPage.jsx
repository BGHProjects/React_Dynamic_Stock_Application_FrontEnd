import React from "react";
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");

export default function LandingPage() {
    
    function deleteToken(){
        localStorage.setItem("token", "");
    }

    //This is to ensure that when the application starts
    //there is no already existing token, so the user
    //will not be considered logged in
    deleteToken();
    
    return (
        <main>
            <Features />
        </main>
    );
}

const Features = () => (
    <section className="LPfeatures">
        <div className="LPF__content">
            <h1 className="LPF__title">STOCK FINDER</h1>
            <p className="LPF__subtitle">To continue to Stock Search, please select one of the following:</p>

            <Link to="/stocksearch">Continue as Guest</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    </section>
    );