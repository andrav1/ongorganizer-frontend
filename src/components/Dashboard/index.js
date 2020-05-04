import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

import './styles.css';
import { withStore } from '../helpers';

class Register extends Component {
  state = {};

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

      //   await store.authStore.registerVolunteer(this.state);
      //   return this.props.history.push('/login');
    } catch (error) {
      //   document.getElementById('volunteer-register-form').reset();
      //   console.log(error);
      //   this.setState({ error: error.response.data });
      //   setTimeout(() => this.setState({ error: {} }), 3000);
    }
  }

  render() {
    const {} = this.state;

    return <div></div>;
  }
}

export default withStore(Register);
