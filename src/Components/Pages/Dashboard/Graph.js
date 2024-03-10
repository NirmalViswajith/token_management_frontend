import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const PriorityGraph = () => {
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

    const totalTickets = priorityData.length;
    const importantOpenTicketsCount = priorityData.filter(
      (item) =>
        (item.priority === "High" || item.priority === "Medium") &&
        item.status !== "Closed"
    ).length;
    const assignedTicketsCount = priorityData.filter((item) => item.status === "Assigned").length;
    const newTicketsCount = priorityData.filter((item) => item.status === "New").length;
    const closedTicketsCount = priorityData.filter((item) => item.status === "Closed").length;

    const data = {
      labels: ['Total Tickets', 'Important Tickets', 'Assigned Tickets', 'New Tickets', 'Closed Tickets'],
      datasets: [
        {
          label: 'Priority',
          backgroundColor: ['rgba(255, 87, 51, 0.8)','rgba(255, 195, 0, 0.8)','rgba(76, 175, 80, 0.8)','rgba(33, 150, 243, 0.8)', 'rgba(144, 164, 174, 0.8)'],
          borderColor: ['#FF5733','#FFC300','#4CAF50','#2196F3','#90A4AE',],
          borderWidth: 1,
          barThickness: 50,
          data: [totalTickets, importantOpenTicketsCount, assignedTicketsCount, newTicketsCount, closedTicketsCount],
        },
      ],
    };

    const options = {
      indexAxis: 'x',
      scales: {
        x: {
          type: 'category',
          labels: data.labels,
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx = chartRef.current.getContext('2d');
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

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
    <div style={{ height: '350px', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PriorityGraph;
