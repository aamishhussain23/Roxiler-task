import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/transactions" element={<TransactionsTable />} />
          <Route path="/barchart" element={<BarChart />} />
          <Route path="/piechart" element={<PieChart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
