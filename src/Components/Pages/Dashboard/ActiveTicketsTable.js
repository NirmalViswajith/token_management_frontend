import React from "react";
import 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
const ActiveTicketsTable = () => {
const [priority, setPriority] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getTokenData");
        console.log(response.data);
        setPriority(response.data);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchData();
  }, []);
  const Low = priority.filter((items) => items.priority === 'Low').length;
  const Medium = priority.filter((items) => items.priority === 'Medium').length;
  const High = priority.filter((items) => items.priority === 'High').length;
  const pieChartData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [Low, Medium, High],
        backgroundColor: ['#FF5733', '#FFC300', '#4CAF50'], 
      hoverBackgroundColor: ['#FF5733', '#FFC300', '#4CAF50'],
      },
    ],
  };
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    height: 1000, 
    width: 1000,  
  };
  return (
    <div className="d-flex">
      <div className="col-md-6 border-2 ">
        <div className="bg-blue-400 text-white ">
          <h6 className="ml-2 p-1">SLA</h6>
        </div>
        <div className="table-container ml-2 mt-6 pr-3">
          <table className="table table-bordered table-hover">
            <thead style={{ position: "", top: '0' }} className="thead-dark">
              <tr>
                <th>SLA</th>
                <th>Low Risk</th>
                <th>Medium Risk</th>
                <th>High Risk</th>
                <th>creation date</th>
                <th>last updated</th>
                <th>assignedto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Critical SLA</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>High SLA</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Normal SLA</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Suppliers SLA</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-md-6 border-2">
        <div className="bg-blue-400 text-white">
          <h6 className="ml-2 p-1">Active tickets</h6>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:'-30px'
        }}>
          <div className="ml-2 mt-3 mb-2 mr-3 p-4" style={{ height: '300px', width: '350px' }}>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveTicketsTable;
