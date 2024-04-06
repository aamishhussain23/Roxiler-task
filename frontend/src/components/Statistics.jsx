import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css'; 

function Statistics() {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [month, setMonth] = useState("January"); 

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchStatistics = async () => {
      const monthNumber = monthNames.indexOf(month) + 1; 
      try {
        const response = await axios.get(`https://aamish-hussain-roxiler-task.onrender.com/statistics`, { params: { month: monthNumber.toString() } });
        if (response.data && response.data.length > 0) {
          setStatistics(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchStatistics();
  }, [month]);

  return (
    <div className="statistics">
      <select className="month-select" value={month} onChange={e => setMonth(e.target.value)}>
        
        {monthNames.map((m, index) => (
          <option key={index} value={m}>{m}</option>
        ))}
      </select>
      <div className="stat">Total Sale Amount: {statistics.totalSaleAmount}</div>
      <div className="stat">Total Sold Items: {statistics.totalSoldItems}</div>
      <div className="stat">Total Not Sold Items: {statistics.totalNotSoldItems}</div>
    </div>
  );
}

export default Statistics;
