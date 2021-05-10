import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import projectConfig from '@frontend/shared';

export default function NavComponent() {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">{projectConfig.title}</Navbar.Brand>
      <Nav className="mr-auto justify-content-end  w-100 pr-5">
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <Button variant="outline-light">Login</Button>
    </Navbar>
  );
}
