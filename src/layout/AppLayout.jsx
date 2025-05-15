import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link, NavLink, Outlet } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AppLayout.css';

const AppLayout = () => {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="netflix-navbar shadow-sm border-bottom border-secondary"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png"
              alt="Netflix"
              style={{ width: 115, height: 34 }} 
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/movies">
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 search-input"
                aria-label="Search"
              />
              <Button className="search-btn">
                <i className="bi bi-search" />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default AppLayout