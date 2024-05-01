import React from "react";
import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { useUser } from './UserContext';
import { jwtDecode } from 'jwt-decode';

function NavBar() {
  const navigate = useNavigate();
  const { user, setUser, token, setToken } = useUser();
  const username = token ? jwtDecode(token).username : null;

  function logOut() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          {token && username ? (
            <>
            <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
              <NavItem>
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={logOut} to="/">Log Out {username}</NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
