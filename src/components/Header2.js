import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
// import './Header.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import {  Container, Nav } from "react-bootstrap";


class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand id='title'>My Favorite Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className='navLinks'>Home</Link>
            <Link to="/Profile" className='navLinks'>Profile</Link>
            <Link to="/api-data" className='navLinks'>api-data</Link>
          </Nav>

        </Navbar.Collapse>
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}


        {<LogoutButton />}
        {<LoginButton />}
        {/* 
        {isAuthenticated &&
          <LoginButton/> 
        }
        {isAuthenticated &&
          <LogoutButton/> 
        } */}
      </Navbar>
    );
  }
}

export default Header;
