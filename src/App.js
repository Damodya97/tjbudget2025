import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignIn from './SignIn';
import Login from './Login';
import FrontPage from './FrontPage';
import Dashboard from './Dashboard';
import Transaction from './Transaction'
import BudgetData from './BudgetData';

function App() {
  return (
    <Router>
       <nav>
          <Link to="/"></Link><Link to="/login"></Link><Link to="/frontpage"></Link><Link to="/dashboard"></Link><Link to="/dashboard/prevtransaction"></Link>
      </nav>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/frontpage" element={<FrontPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="dashboard/prevtransaction" element={<Transaction />} />
      </Routes>
    </Router>
  );
}

export default App;
