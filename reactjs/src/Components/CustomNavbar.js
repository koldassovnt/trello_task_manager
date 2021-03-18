import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';


function CustomNavbar(props) {

  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
  const isLogged = props.isLogged;
  const name = props.name;
  
  const handleSubmit = event =>{
    event.preventDefault();
    removeCookieJWT('jwt');
    window.location.replace("/");
  }


    return (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">ITrello</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>

            {isLogged ? (
            <Nav className="navlink">
              <Nav.Link href="/allcards">All Cards</Nav.Link>
              <Nav.Link href="/profile">{name}</Nav.Link>
              <Form className="logout" inline onSubmit={handleSubmit}>
                <Button type="submit" size="sm" variant="outline-light">Log Out</Button>
              </Form>
            </Nav>
            ) : (
            <Nav className="navlink">
                <Nav.Link href="/login">Login</Nav.Link>
             <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }


  export default CustomNavbar;