import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.css';
import { withStore } from '../helpers';

class Register extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    password: '',
    address: '',
    activity_domain: '1',
    legal_person: '',
    website: '',
    summary: '',
    error: {},
  };

  handleChange(event) {
    const {
      target: { value, name },
    } = event;

    return this.setState({
      [name]: value,
    });
  }

  async handleSubmitForm(event) {
    try {
      event.preventDefault();
      const { store } = this.props;

      await store.authStore.registerNGO(this.state);
      return this.props.history.push('/login');
    } catch (error) {
      document.getElementById('ngo-register-form').reset();
      this.setState({ error: error.response.data });

      setTimeout(() => this.setState({ error: {} }), 3000);
    }
  }

  render() {
    const {
      email,
      name,
      password,
      address,
      username,
      activity_domain,
      legal_person,
      website,
      summary,
      error,
    } = this.state;

    return (
      <div className="auth-wrapper">
        {error.non_field_errors && (
          <Alert variant="danger">{error.non_field_errors[0]}</Alert>
        )}

        <div className="auth-inner">
          <Form
            id="ngo-register-form"
            onSubmit={event => this.handleSubmitForm(event)}
          >
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                name="email"
                placeholder="name@example.com"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="password"
                placeholder="Password"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                name="name"
                placeholder="Name of NGO"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="summary"
                value={summary}
                placeholder="Describe your NGO"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                name="address"
                placeholder="Street street no 7"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Legal representant</Form.Label>
              <Form.Control
                type="text"
                name="legal_person"
                value={legal_person}
                placeholder="First Name Last Name"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={website}
                placeholder="www.website.com"
                onChange={event => this.handleChange(event)}
                required
              />
              {error.website && <label class="error">{error.website}</label>}
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                name="username"
                placeholder="username"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>
            {error.username && <label class="error">{error.username}</label>}
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Activity Domain</Form.Label>
              <Form.Control
                as="select"
                name="activity_domain"
                value={activity_domain}
                onChange={event => this.handleChange(event)}
                required
              >
                <option value="1" selected>
                  Human Rights
                </option>
                <option value="2">Environment</option>
                <option value="3">Animals</option>
                <option value="4">Educational</option>
                <option value="5">Management</option>
                <option value="6">Children activities</option>
                <option value="7">Charity</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <p className="forgot-password text-right">
              Already registered? <Link to="login">Sign in.</Link>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default withStore(Register);
