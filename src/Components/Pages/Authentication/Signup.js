import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [signupValues, setSignupValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { username, email, password, confirmPassword } = signupValues;

  const handleChange = (event) => {
    setSignupValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const signupDetails = {
      email: email,
      username: username,
      password: password,
    };

    try {
      const res = await axios.post("http://localhost:8081/signUp", signupDetails);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
    console.log(signupDetails);
    setSignupValues({ username: '', email: '', password: '', confirmPassword: '' });
    setError('');
  };

  return (
    <Container className="mt-5" style={{ width: '30%', border: '3px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h2>Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group controlId="formUsername" className='form-floating mb-2'>
          <Form.Control
            type='text'
            placeholder='Enter Username'
            name='username'
            value={username}
            onChange={handleChange}
          />
          <Form.Label>Username</Form.Label>
        </Form.Group>

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

        <Form.Group controlId="formPassword" className="form-floating mb-2">
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Form.Label>Password</Form.Label>
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="form-floating mb-2">
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          <Form.Label>Confirm Password</Form.Label>
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSignup}>
          Sign Up
        </Button>
      </Form>
      <p className="login-link">
        Already have an account? <span><Link to="/" className="link-decor">Login</Link></span>
      </p>
    </Container>
  );
};

export default SignUp;
