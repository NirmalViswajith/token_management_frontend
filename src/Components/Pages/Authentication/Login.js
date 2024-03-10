import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { email, password } = loginValues;

  const handleChange = (event) => {
    setLoginValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email and password format
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const loginDetails = {
      email: email,
      password: password,
    };

    console.log(loginDetails);
    try {
      const res = await axios.post("http://localhost:8081/login", loginDetails);
      if(res.data === 'success') {
        navigate('/tokenPage');
      } else if (res.data === 'failed'){
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
    }
   
    setLoginValues({ email: '', password: '' });
    setError('');
  };

  

  return (
    <Container className="mt-5" style={{ width: '30%', border: '3px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group controlId="formEmail" className='form-floating mb-2'>
          <Form.Control
            type='email'
            placeholder='Enter E-mail'
            name='email'
            value={email}
            onChange={handleChange}
          />
          <Form.Label>Email</Form.Label>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="form-floating mb-2">
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Form.Label>Password</Form.Label>
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleLogin}>
          Login
        </Button>
      </Form>
      <p className="signup-link">
        Don't have an account? <span><Link to="/signUp" className="link-decor">Sign Up</Link></span>
      </p>
    </Container>
  );
};

export default Login;
