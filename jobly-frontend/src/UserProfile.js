import React, { useState, useContext, useEffect } from 'react';
import { Card, CardBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const { user, updateUserDetails } = useUser();
  const username = localStorage.getItem('username');

  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserDetails(formData);
    navigate('/');
  };

  return (
    <Card>
    <CardBody>
    <h3>User Profile</h3>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="username">Username: </label>
        <input
          readOnly={username}
          id="username"
          type="text"
          name="username"
          placeholder={username}
          value={username}
          onChange={handleChange}
        />
      </FormGroup>
      
      <FormGroup>
        <label htmlFor="firstName">First Name: </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          placeholder={user.firstName}
          value={formData.firstName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="lastName">Last Name: </Label>
        <Input
          id="lastName"
          type="text"
          name="lastName"
          placeholder={user.lastName}
          value={formData.lastName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email: </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder={user.email}
          value={formData.email}
          onChange={handleChange}
        />
      </FormGroup>
            <Button> Save Changes</Button>
        </Form>
    </CardBody>
    </Card>
  );
}

export default UserProfile;