import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

function App() {
  const [month, setMonth] = useState('March');

  return (
    <Router>
      <div className="App">
        <select value={month} onChange={e => setMonth(e.target.value)}>
          {/* Render month options */}
        </select>
        <Routes>
          <Route path="/" element={<Statistics month={month} />} />
          <Route path="/transactions" element={<TransactionsTable month={month} />} />
          <Route path="/barchart" element={<BarChart month={month} />} />
          <Route path="/piechart" element={<PieChart month={month} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
