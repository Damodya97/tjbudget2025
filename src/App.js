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
          <Link to="/tjbudget2025"></Link><Link to="/tjbudget2025/login"></Link><Link to="/tjbudget2025/frontpage"></Link><Link to="/tjbudget2025/dashboard"></Link><Link to="/tjbudget2025/dashboard/prevtransaction"></Link>
      </nav>
      <Routes>
        <Route path="/tjbudget2025" element={<SignIn />} />
        <Route path="/tjbudget2025/login" element={<Login />} />
        <Route path="/frontpage" element={<FrontPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="dashboard/prevtransaction" element={<Transaction />} />
      </Routes>
    </Router>
  );
}

export default App;
