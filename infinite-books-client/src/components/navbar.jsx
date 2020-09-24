import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Link from "react-router-dom";
import Route from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <Navbar expand="lg">
        <Nav fill className="mr-auto">
          <Nav.Item>
            <Nav.Link>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Books</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="Aregister.html">Authors</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Readers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Forum</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>More Info</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Link>Log In</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
