import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

const BarChart = () => {
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState("");
  const fetchData = async () => {
    await axios
      .get(`https://aamish-hussain-roxiler-task.onrender.com/barchart`,{params:{month:month}})
      .then((res) => {
        setLabels(res.data.map((item) => item.priceRange));
        setChartData(res.data.map((item) => item.count));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  },[month]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "count",
        data: chartData,
        backgroundColor: [
          "rgba(255, 127, 80)",
          "rgba(72, 209, 204)",
          "rgba(176, 224, 230)",
          "rgba(255, 215, 0)",
          "rgba(148, 0, 211)",
        ],
      },
    ],
  };
  return (
    <>
     <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center'}}>
     <div>
        <label htmlFor="month" className="mr-2">Choose a month:</label>
        <select
          id="month"
          style={{border: '2px solid gray', borderRadius: '4px', padding: '5px', outline: 'none'}}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <Chart type="bar" data={data} />
    </div>
    </>
  );
};

export default BarChart;
