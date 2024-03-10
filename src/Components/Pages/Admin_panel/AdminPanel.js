import React, { useState, useEffect } from 'react';
import NewMailComponent from './NewMailComponent';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const AdminPanel = () => {
  const [showNewMailComponent, setShowNewMailComponent] = useState(false);
  const [mailData, setMailData] = useState([]);
  const navigate = useNavigate();

  const handleAddNewMailClick = () => {
    setShowNewMailComponent(true);
  };

  const handleCloseNewMailComponent = () => {
    setShowNewMailComponent(false);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/getMailData/delete/${id}`);
      console.log(response.data);
      if (response.data === 'success') {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching token data:", error);
    }
  }
  const handleEditClick = (id) => {
    navigate(`/editMailBox/${id}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/addMailData");
        console.log(response.data);
        setMailData(response.data)
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between">
        <h1>Admin Panel</h1>
        <Button variant="primary" onClick={handleAddNewMailClick}>
          + Add New Mail
        </Button>
      </div>
      <h4 className='mt-20'>Inbox List <FontAwesomeIcon icon={faArrowDown} /></h4>
      <hr />
      <div>
        {mailData.map((mail, index) => (
          <div key={mail.id} className="border-bottom mb-3 pb-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p><strong>Mail Address:</strong> {mail.emailAddress}</p>
                <p><strong>User Name:</strong> {mail.userName}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="" onClick={() => handleEditClick(mail.Id)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button className="" onClick={() => handleDeleteClick(mail.Id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showNewMailComponent && (
        <NewMailComponent onClose={handleCloseNewMailComponent} />
      )}
    </div>
  );
}

export default AdminPanel;
