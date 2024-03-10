import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const StatusGraph = () => {
  const [priorityData, setPriorityData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getTokenData");
        console.log(response.data);
        setPriorityData(response.data);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Check if priorityData is available
    if (priorityData.length === 0) {
      return;
    }

    const Low = priorityData.filter((items) => items.priority === 'Low').length;
    const Medium = priorityData.filter((items) => items.priority === 'Medium').length;
    const High = priorityData.filter((items) => items.priority === 'High').length;

    const data = {
      labels: ['High', 'Medium', 'Low'],
      datasets: [
        {
          label: 'Priority',
          backgroundColor: ['#FF5733', '#FFC300', '#4CAF50'],
          borderColor: ['#FF5733', '#FFC300', '#4CAF50'],
          borderWidth: 1,
          barThickness: 50,
          data: [High, Medium, Low], // Adjusted the order of data values
        },
      ],
    };

    const options = {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          type: 'category',
          labels: data.labels,
        },
      },
    };

    const ctx = chartRef.current.getContext('2d');

    // Check if chartRef.current.chart is truthy before attempting to destroy
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Create the new chart instance
    chartRef.current.chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, [priorityData]); // Added priorityData as a dependency

  return (
    <div style={{ height: '350px', width: '100%', display: 'flex', justifyContent: 'center', marginTop:'25px' }}>
    <canvas ref={chartRef}></canvas>
  </div>
  );
};

export default StatusGraph;
