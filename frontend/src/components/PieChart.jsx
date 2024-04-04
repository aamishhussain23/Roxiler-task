import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ month }) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/piechart?month=${month}`);
        setPieChartData(result.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };
    fetchPieChartData();
  }, [month]);

  const data = {
    labels: pieChartData.map(item => item.category),
    datasets: [
      {
        data: pieChartData.map(item => item.count),
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)', 'rgba(255,159,64,0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(75,192,192,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="App">
      {/* Render month selector, statistics, transactions table, and bar chart */}
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
