import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import "./Home.css"
import { useUser } from './UserContext';

function Home() {
  const navigate = useNavigate(); 
  const { token } = useUser();
  const username = localStorage.getItem('username');

  function goToLogin() {
    navigate('/login');
  }

  function goToSignup() {
    navigate('/signup');
  }

  return (
    <section className="col-md-8">
      <Card style={{color:'black'}}>
        <CardBody className="text-center">
          <CardTitle>
            <h2 className="font-weight-bold">Jobly</h2>
            <p>All the jobs in one, convenient place.</p>
            {token ? (
              <p>Welcome Back, {username}!</p>
            ) : (
              <span>
                <Button onClick={goToLogin}>Log In</Button>
                <Button onClick={goToSignup}>Sign Up</Button>
              </span>
            )}
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
