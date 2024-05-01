import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { useUser } from './UserContext';
import JoblyApi from './JoblyApi';

function SignUp() {
    const navigate = useNavigate();
    const { setUser, setToken } = useUser();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
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
        try {
            const { data } = await axios.post('http://localhost:3001/auth/register', formData);
            if (data.token) {
                setToken(data.token);
                const user = jwtDecode(data.token);
                setUser(user);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', formData.username);
                JoblyApi.setToken(data.token);  
                navigate('/');
            } else {
                console.log('Token not received:', data);
            }
        } catch (error) {
            console.error('There was an error during registration:', error);
        }
    };

    return (
        <Card>
            <CardBody>
                <h3>Sign Up</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="username">Username: </label>
                        <Input 
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="password">Password: </label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="firstname">First Name: </label>
                        <Input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="lastname">Last Name: </Label>
                        <Input
                            id="lastName"
                            type="text"
                            name="lastName"
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
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button>Sign Up</Button>
                </Form>
            </CardBody>
        </Card>
    );
}

export default SignUp;
