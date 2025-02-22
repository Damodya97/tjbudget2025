import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import Login from './Login';
import FrontPage from './FrontPage';
import Dashboard from './Dashboard';
import Transaction from './Transaction'
import BudgetData from './BudgetData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tjbudget2025" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/frontpage" element={<FrontPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="dashboard/prevtransaction" element={<Transaction />} />
      </Routes>
    </Router>
  );
}

export default App;
