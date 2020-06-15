import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

//pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StockSearch from "./pages/StockSearch";
import Header from './components/Header';
import StockDetails from "./pages/StockDetails";
import StockDetailsAuth from "./pages/StockDetailsAuth";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/stocksearch">
            <StockSearch />
          </Route>

          <Route path="/stockdetails" component={StockDetails} />

          <Route path="/stockdetailsauth" component={StockDetailsAuth} />

        </Switch>

      </div>
    </Router>
    
  );
}

export default App;
