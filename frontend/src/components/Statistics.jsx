import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Statistics({ month }) {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      const result = await axios.get(`http://localhost:3000/statistics?month=${month}`);
      setStatistics(result.data);
    };
    fetchStatistics();
  }, [month]);

  return (
    <div>
      <div>Total Sale Amount: {statistics.totalSaleAmount}</div>
      <div>Total Sold Items: {statistics.soldItems}</div>
      <div>Total Not Sold Items: {statistics.notSoldItems}</div>
    </div>
  );
}

export default Statistics;
