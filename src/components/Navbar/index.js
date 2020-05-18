import React, { Component } from 'react';
import { Navbar as NB, Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { withStore } from '../helpers';

class Navbar extends Component {
  async handleLogout() {
    const { store } = this.props;
    await store.authStore.reset();
    return this.props.history.push('/');
  }
  render() {
    const { store } = this.props;

    return (
      <NB bg="dark" variant="dark">
        <NB.Brand href="/">NGO ORGANIZER</NB.Brand>
        {!store.authStore.isLoggedIn ? (
          <Nav className="mr-auto" inline>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        ) : (
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.handleLogout()}>Logout</Nav.Link>

            {store.authStore.isVolunteer ? (
              <>
                <Nav.Link href="/volunteer_profile">Edit Profile</Nav.Link>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/ngo_profile">Edit Profile</Nav.Link>
                <NavDropdown title="Dashboard" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/dashboard">
                    Review new recruits
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/volunteers">
                    See volunteers
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              </>
            )}
            <NavDropdown title="Projects" id="basic-nav-dropdown">
              <NavDropdown.Item href="/project">See projects</NavDropdown.Item>

              {store.authStore.isVolunteer ? (
                <NavDropdown.Item href="/my_projects">
                  See my projects
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item href="/review_applications">
                  Review Applications
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        )}
      </NB>
    );
  }
}

export default withRouter(withStore(Navbar));
