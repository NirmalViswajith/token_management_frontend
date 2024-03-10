import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TokenForm from './TokenForm';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Token = () => {
  const [isFormVisible, setFormVisibility] = useState(false);
  const [tokenData, setTokenData] = useState([]);
  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.substring(0, maxLength);
    return `${truncatedText}...`;
  };

  const handleAddTokenClick = () => {
    setFormVisibility(true);
  };
  const handleEditClick = (id) => {
    navigate(`/tokenPage/${id}`)
  }

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/getTokenData/delete/${id}`);
      console.log(response.data);
      if (response.data === 'success') {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching token data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getTokenData");
        console.log(response.data);
        const sortedTokenData = response.data.sort((a, b) => {
          const priorityOrder = { Low: 1, Medium: 2, High: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        setTokenData(sortedTokenData);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Container>
        <div className="flex justify-end mt-4 mr-4">
          <Button onClick={handleAddTokenClick}>+ ADD NEW TOKEN</Button>
        </div>
        {isFormVisible && <TokenForm handlevisibility={setFormVisibility} />}
      </Container>
      <div className="  mt-8">
        <h1 className="text-2xl font-bold mb-4 ml-10">Token Data</h1>
        <table className="min-w-full bg-white ">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2">ID</th>
              <th className="py-2 px-4 border-b-2">Customer Name</th>
              <th className="py-2 px-4 border-b-2">Description</th>
              <th className="py-2 px-4 border-b-2">Issue</th>
              <th className="py-2 px-4 border-b-2">Reported Date</th>
              <th className="py-2 px-4 border-b-2">Service</th>
              <th className="py-2 px-4 border-b-2">Total Issue</th>
              <th className="py-2 px-4 border-b-2">Updated Date</th>
              <th className="py-2 px-4 border-b-2">Priority</th>
              <th className="py-2 px-4 border-b-2">Status<FontAwesomeIcon className='ml-2' icon={faArrowDown} /></th>
              <th className="py-2 px-4 border-b-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokenData.map((item) => (
              <tr key={item.Id}>
                <td className="py-2 px-4 ">{item.Id}</td>
                <td className="py-2 px-4 ">{item.customerName}</td>
                <td className="py-2 px-4" style={{ overflow: 'hidden', maxHeight: '50px', whiteSpace: 'nowrap' }}>{truncateText(item.description, 10)}</td>

                <td className="py-2 px-4" style={{ overflow: 'hidden', maxHeight: '50px', whiteSpace: 'nowrap' }}>{truncateText(item.issue, 10)}</td>
                <td className="py-2 px-4">{new Date(item.reportedDate).toLocaleDateString()}</td>
                <td className="py-2 px-4">{item.service}</td>

                <td className="py-2 px-4">{item.totalIssue}</td>
                <td className="py-2 px-4">{new Date(item.updatedDate).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  <span className={`badge ${item.priority === 'High' ? 'bg-danger' : (item.priority === 'Medium' ? 'bg-warning' : 'bg-success')}`}>
                    {item.priority}
                  </span>
                </td>
                <td className={`py-2 px-4 ${item.status && `ml-5 badge rounded-pill ${item.status === 'Assigned' ? 'bg-emerald-300 text-green-500' : (item.status === 'New' ? 'ml-5 bg-warning text-dark' : 'ml-5 bg-success text-white')}`} mt-2`}>
                  {item.status}
                </td>
                {/* Edit button */}
                <td className="py-2 px-4">
                  <button className="" onClick={() => handleEditClick(item.Id)} >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button className="ml-6" onClick={() => handleDeleteClick(item.Id)}>
                  <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>

                {/* Delete button */}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Token;
