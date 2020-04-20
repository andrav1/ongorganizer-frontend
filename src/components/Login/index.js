import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import './styles.css';
import { withStore } from '../helpers';

class Login extends Component {
  state = {
    username: '',
    password: '',
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

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="auth-wrapper">
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
          </form>
        </div>
      </div>
    );
  }
}

export default withStore(Login);
