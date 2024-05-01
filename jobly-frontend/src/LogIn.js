import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { useUser } from './UserContext';
import "./LogIn.css"
import JoblyApi from './JoblyApi';




function LogIn() {
    const { setUser, setToken } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); 
    try {
      const response = await axios.post('http://localhost:3001/auth/token', formData);
      const { token } = response.data; 
  
      if (token) {
        setToken(token);
        localStorage.setItem('token', token); 
        const user = jwtDecode(token); 
        console.log(user)
        setUser(user);
        localStorage.setItem('username', formData.username);
        JoblyApi.setToken(token);   
        navigate('/');
      } else {
        console.log('Token not received:', response.data);
      }
    } catch (error) {
        console.error('There was an error during login:', error.response.data.error);
    }
  };

  return (
    <Card>
    <CardBody>
    <h3>Welcome Back</h3>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormGroup>
      <Button>Log In</Button>
      </Form>
      </CardBody>
      </Card>
  );
}

export default LogIn;