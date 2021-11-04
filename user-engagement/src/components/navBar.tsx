// =============================
// = File Name: navBar.tsx     =
// =   Version: 1.0            =
// = Edited by: Ethan Houley   =
// =============================
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">

                <Navbar.Brand href="/">Resource Engagment</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/client">Client</Nav.Link>
                <Nav.Link href="/employee">Employee</Nav.Link>
                <Nav.Link href="/engagment">Engagment</Nav.Link>
            </Nav>
  </Navbar >
    );
}

export default NavBar;