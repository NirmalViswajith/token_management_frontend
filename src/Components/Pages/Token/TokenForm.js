import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './TokenForm.css';
import axios from 'axios';

const TokenForm = ({ handlevisibility }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    reportedDate: '',
    service: '',
    issue: '',
    priority: '',
    siteName: '',
    updatedDate: '',
    totalIssue: '',
    description: '',
    status: '',
  });
  

  const { customerName, reportedDate, service, issue, priority, siteName, updatedDate, totalIssue, description,
    status } = formData;

  const handleCloseClick = () => {
    handlevisibility(false);
  };

  const handleAddTokenClick = async () => {
    
    const tokenValues = {
      customerName: customerName,
      reportedDate: reportedDate,
      service: service,
      issue: issue,
      priority: priority,
      siteName: siteName,
      updatedDate: updatedDate,
      totalIssue: totalIssue,
      description: description,
      status: status,
    };

    try {
      const res = await axios.post("http://localhost:8081/addToken", tokenValues);
      alert(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    
  };
  const isFormValid = () => {
    return (
      customerName !== '' &&
      reportedDate !== '' &&
      service !== '' &&
      issue !== '' &&
      priority !== '' &&
      siteName !== '' &&
      updatedDate !== '' &&
      totalIssue !== '' &&
      description !== '' &&
      status !== ''
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl h-4/5">
        <h2 className="text-2xl font-bold mb-4">Add Token</h2>
        
        <Form onSubmit={handleAddTokenClick}>
          <Row>
            <Col>
              <Form.Group controlId="customerName">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="reportedDate">
                <Form.Label>Reported Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.reportedDate}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="service">
                <Form.Label>Service</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter service"
                  value={formData.service}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="issue">
                <Form.Label>Issue</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter issue"
                  value={formData.issue}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="priority">
                <Form.Label>Priority</Form.Label>
                <div>
                  <input
                    type="radio"
                    className="btn-check"
                    id="highPriority"
                    name="priority"
                    autoComplete="off"
                    checked={formData.priority === 'High'}
                    onChange={() => setFormData((prevData) => ({ ...prevData, priority: 'High' }))}
                  />
                  <label className="btn btn-outline-danger mr-3" htmlFor="highPriority">
                    High
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    id="mediumPriority"
                    name="priority"
                    autoComplete="off"
                    checked={formData.priority === 'Medium'}
                    onChange={() => setFormData((prevData) => ({ ...prevData, priority: 'Medium' }))}
                  />
                  <label className="btn btn-outline-warning mr-3" htmlFor="mediumPriority">
                    Medium
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    id="lowPriority"
                    name="priority"
                    autoComplete="off"
                    checked={formData.priority === 'Low'}
                    onChange={() => setFormData((prevData) => ({ ...prevData, priority: 'Low' }))}
                  />
                  <label className="btn btn-outline-success mr-3" htmlFor="lowPriority">
                    Low
                  </label>
                </div>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="siteName">
                <Form.Label>Site Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter site name"
                  value={formData.siteName}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="updatedDate">
                <Form.Label>Updated Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.updatedDate}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="totalIssue">
                <Form.Label>Total Issue</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter total issue"
                  value={formData.totalIssue}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <div>
                  <input
                    type="radio"
                    className="btn-check"
                    id="statusAssigned"
                    name="status"
                    autoComplete="off"
                    checked={formData.status === 'Assigned'}
                    onChange={() => setFormData((prevData) => ({ ...prevData, status: 'Assigned' }))}
                  />
                  <label className="btn btn-outline-danger mr-3" htmlFor="statusAssigned">
                    Assigned
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    id="statusNew"
                    name="status"
                    autoComplete="off"
                    checked={formData.status === 'New'}
                    onChange={() => setFormData((prevData) => ({ ...prevData, status: 'New' }))}
                  />
                  <label className="btn btn-outline-warning mr-3" htmlFor="statusNew">
                    New
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    id="statusClosed"
                    name="status"
                    autoComplete="off"
                    checked={formData.status === 'Closed'}
                    onChange={() => setFormData((prevData) => ({ ...prevData, status: 'Closed' }))}
                  />
                  <label className="btn btn-outline-success mr-3" htmlFor="statusClosed">
                    Closed
                  </label>
                </div>
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
              disabled={!isFormValid()}
            >
              Add Token
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default TokenForm;
