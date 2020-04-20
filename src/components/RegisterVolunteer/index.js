import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

import './styles.css';
import { withStore } from '../helpers';

class Register extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    password: '',
    address: '',
    main_interest: '1',
    summary: '',
    birth_date: '',
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

      await store.authStore.registerVolunteer(this.state);
      return this.props.history.push('/login');
    } catch (error) {
      document.getElementById('volunteer-register-form').reset();
      console.log(error);
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
      birth_date,
      main_interest,
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
            id="volunteer-register-form"
            onSubmit={event => this.handleSubmitForm(event)}
          >
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="name@example.com"
                onChange={event => this.handleChange(event)}
                name="email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                name="password"
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
                placeholder="First Name Last Name"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={summary}
                placeholder="Describe yourself"
                name="summary"
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
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                value={birth_date}
                name="birth_date"
                placeholder="zz/ll/aaaa"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="username"
                name="username"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Main Interest</Form.Label>
              <Form.Control
                as="select"
                value={main_interest}
                name="main_interest"
                onChange={event => this.handleChange(event)}
                required
              >
                <option value="1">Human Rights</option>
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
