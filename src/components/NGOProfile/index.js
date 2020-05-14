import React, { Component } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.css';
import { withStore } from '../helpers';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    address: '',
    activity_domain: '1',
    legal_person: '',
    website: '',
    summary: '',
    new_password: '',
    areYouSure: false,
    error: {},
  };
  async componentDidMount() {
    const { store } = this.props;
    const profile_info = await store.authStore.getNGOProfile();

    this.setState({
      name: profile_info.name,
      email: profile_info.user.email,
      address: profile_info.address,
      activity_domain: profile_info.activity_domain,
      summary: profile_info.summary,
      legal_person: profile_info.legal_person,
      website: profile_info.website,
    });
  }
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

      await store.authStore.updateNGOProfile(this.state);
      window.location.reload();
      return this.props.history.push('/ngo_profile');
    } catch (error) {
      document.getElementById('ngo-register-form').reset();
      this.setState({ error: error.response.data });
      window.scrollTo(0, 0);

      setTimeout(() => this.setState({ error: {} }), 3000);
    }
  }
  async deleteProfile() {
    const { store } = this.props;
    await store.authStore.deleteNgoProfile();
    return this.props.history.push('/');
  }

  render() {
    const {
      email,
      name,
      password,
      address,
      activity_domain,
      legal_person,
      website,
      summary,
      new_password,
      areYouSure,
      error,
    } = this.state;

    return (
      <div className="auth-wrapper">
        <Modal
          show={areYouSure}
          onHide={() => this.setState({ areYouSure: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Hey, you're about to delete your profile. Are you sure?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => this.deleteProfile()}>
              Yes
            </Button>
            <Button
              variant="primary"
              onClick={() => this.setState({ areYouSure: false })}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        {error.non_field_errors && (
          <Alert variant="danger">{error.non_field_errors[0]}</Alert>
        )}
        {error.password && (
          <Alert variant="danger">
            Password is not correct. Edit unsuccessful!
          </Alert>
        )}
        {error.username && (
          <Alert variant="danger">Username already exists</Alert>
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
            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password (if necessary)</Form.Label>
              <Form.Control
                type="password"
                value={new_password}
                placeholder="NEW Password"
                name="new_password"
                onChange={event => this.handleChange(event)}
              />{' '}
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
              Save changes
            </Button>{' '}
            <Button
              variant="primary"
              onClick={() => this.setState({ areYouSure: true })}
            >
              Delete profile
            </Button>
            <p>
              {' '}
              * By deleting your profile you give up any right to receive
              informations from this platform regarding your volunteering. All
              of your data will be deleted form our database and we will not use
              it further in any way
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default withStore(Register);
