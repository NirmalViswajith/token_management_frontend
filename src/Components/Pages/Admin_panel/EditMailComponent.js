import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMailComponent = () => {
  const [formData, setFormData] = useState({
    serverName: '',
    emailAddress: '',
    userName: '',
    password: '',
  });

  const { serverName, emailAddress, userName, password } = formData;

  const {id} = useParams();
  const navigate = useNavigate();

  const handleCloseClick = () => {
    //onClose(false);
  };

  const handleAddTokenClick = async (event) => {
    event.preventDefault();
    const mailValues = {
      serverName: serverName,
      emailAddress: emailAddress,
      userName: userName,
      password: password,
    };

    try {
      const response = await axios.put(`http://localhost:8081/getMailData/edit/${id}`, formData)
      if(response) {
        console.log(response.data);
        navigate('/admin_panel');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/getMailData/edit/${id}`)
      .then(res => {
        console.log(res.data)
        const data = res.data[0];
        setFormData(data);
      })
      .catch(err => console.log(err))
  },[id])
  const isFormValid = () => {
    return (
      serverName !== '' && emailAddress !== '' && userName !== '' && password !== ''
    );
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl h-90">
        <h2 className="text-2xl font-bold mb-4">Edit Token</h2>
        <Form onSubmit={handleAddTokenClick}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="serverName">
                <Form.Label className="text-base font-medium text-gray-700">Server Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter server name"
                  value={serverName}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                />
              </Form.Group>

              <Form.Group controlId="emailAddress">
                <Form.Label className="text-base font-medium text-gray-700">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  value={emailAddress}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="userName">
                <Form.Label className="text-base font-medium text-gray-700">User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  value={userName}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="text-base font-medium text-gray-700">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleInputChange}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="flex items-center justify-center mt-10">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none mr-2"
              onClick={handleCloseClick}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none"
              type="submit"
              disabled={!isFormValid()}
            >
              Edit Mail Address
            </button>
          </div>
        </Form>
      </div>
    </div>

  );
}

export default EditMailComponent;