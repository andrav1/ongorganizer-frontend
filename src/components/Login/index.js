import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Modal, Form } from 'react-bootstrap';
import './styles.css';
import { withStore } from '../helpers';

class Login extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    forgot_password: false,
    error: false,
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
      await store.authStore.login(this.state);
      return this.props.history.push('/dashboard');
    } catch (error) {
      document.getElementById('login-form').reset();
      this.setState({ error: true });

      setTimeout(() => this.setState({ error: false }), 2000);
    }
  }
  async forgot_password(username) {
    const { store } = this.props;
    await store.authStore.forgot_password({ username });

    this.setState({
      forgot_password: false,
      username: '',
      email: '',
    });
  }
  render() {
    const { username, email, password, forgot_password, error } = this.state;

    return (
      <div className="auth-wrapper">
        <Modal
          show={forgot_password}
          onHide={() => this.setState({ forgot_password: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Password change request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Enter your email in order to receive an email to change your
            password.
            <Form
              id="add-project"
              onSubmit={event => this.handleSubmitForm(event)}
            >
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  placeholder="example"
                  onChange={event => this.handleChange(event)}
                  name="username"
                  required
                />{' '}
                <Button
                  variant="primary"
                  onClick={() => this.forgot_password({ username })}
                >
                  Send
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>Check your email! We'll work this out!</Modal.Footer>
        </Modal>
        {error && <Alert variant="danger">Invalid credentials</Alert>}
        <div className="auth-inner">
          <form
            onSubmit={event => this.handleSubmitForm(event)}
            id="login-form"
          >
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                name="username"
                onChange={event => this.handleChange(event)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                name="password"
                onChange={event => this.handleChange(event)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="forgot-password text-right">
              Don't have an account?{' '}
              <Link to="">Go back to choose your scenario.</Link>
            </p>
            <p className="forgot-password">
              Experiencing troubles?{' '}
              <Link
                to=""
                onClick={event => {
                  event.preventDefault();
                  this.setState({ forgot_password: true });
                }}
              >
                Forgot password?
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withStore(Login);
