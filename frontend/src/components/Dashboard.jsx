import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Aamish - Roxiler task</h1>
      <Link className="dashboard-button" to="/statistics">Statistics</Link>
      <Link className="dashboard-button" to="/transactions">Transactions</Link>
      <Link className="dashboard-button" to="/barchart">Bar Chart</Link>
      <Link className="dashboard-button" to="/piechart">Pie Chart</Link>
    </div>
  );
}

export default Dashboard;
