import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert, Col, Row, Image, Modal } from 'react-bootstrap';

import './styles.css';
import { withStore } from '../helpers';

class VolunteerProfile extends Component {
  state = {
    name: '',
    email: '',
    address: '',
    main_interest: '',
    summary: '',
    password: '',
    gender: '',
    years_of_experience: '',
    profile_picture: '',
    new_password: '',
    actual_picture: '',
    ngo: '',
    areYouSure: false,
    error: {},
  };
  async componentDidMount() {
    const { store } = this.props;
    const profile_info = await store.authStore.getVolunteerProfile();

    this.setState({
      name: profile_info.name,
      email: profile_info.user.email,
      address: profile_info.address,
      main_interest: profile_info.main_interest,
      summary: profile_info.summary,
      gender: profile_info.gender,
      years_of_experience: profile_info.years_of_experience,
      actual_picture: profile_info.profile_picture,
      ngo: profile_info.ong ? profile_info.ong.name : '',
    });
  }
  handleChange(event) {
    const {
      target: { value, name, files, type },
    } = event;

    if (type === 'file') {
      return this.setState({
        [name]: value,
        fileObject: files[0],
      });
    }

    return this.setState({
      [name]: value,
    });
  }

  async handleSubmitForm(event) {
    try {
      event.preventDefault();
      const { store } = this.props;

      await store.authStore.updateVolunteerProfile(this.state);
      window.location.reload();
      return this.props.history.push('/volunteer_profile');
    } catch (error) {
      document.getElementById('volunteer-register-form').reset();
      console.log(error);
      this.setState({
        error: error.response.data,
        profile_picture: '',
      });
      window.scrollTo(0, 0);

      setTimeout(() => this.setState({ error: {} }), 3000);
    }
  }
  async deleteProfile() {
    const { store } = this.props;

    await store.authStore.deleteVolunteerProfile();
    return this.props.history.push('/');
  }
  async giveUpNgo() {
    const { store } = this.props;
    try {
      await store.authStore.giveUpNgo({ password: this.state.password });
      window.location.reload();
      return this.props.history.push('/volunteer_profile');
    } catch (error) {
      this.setState({
        error: error.response.data,
        profile_picture: '',
      });
      window.scrollTo(0, 0);

      setTimeout(() => this.setState({ error: {} }), 3000);
    }
  }
  render() {
    const {
      email,
      name,
      address,
      password,
      main_interest,
      summary,
      gender,
      years_of_experience,
      profile_picture,
      new_password,
      ngo,
      actual_picture,
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
            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password (if necessary)</Form.Label>
              <Form.Control
                type="password"
                value={new_password}
                placeholder="NEW Password"
                name="new_password"
                onChange={event => this.handleChange(event)}
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
              <Form.Label>Years of experience</Form.Label>
              <Form.Control
                type="number"
                value={years_of_experience}
                name="years_of_experience"
                placeholder="0"
                onChange={event => this.handleChange(event)}
                required
              />
            </Form.Group>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  Gender
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="F"
                    value="F"
                    name="gender"
                    onChange={event => this.handleChange(event)}
                    id="formHorizontalRadios1"
                    checked={gender === 'F'}
                  />
                  <Form.Check
                    type="radio"
                    label="M"
                    value="M"
                    name="gender"
                    onChange={event => this.handleChange(event)}
                    id="formHorizontalRadios2"
                    checked={gender === 'M'}
                  />{' '}
                </Col>
              </Form.Group>
            </fieldset>
            <Form.Group controlId="exampleForm.ControlInputFile">
              <Col xs={6} md={4}>
                <Image src={actual_picture} fluid />{' '}
              </Col>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                value={profile_picture}
                name="profile_picture"
                onChange={event => this.handleChange(event)}
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
            <Form.Group controlId="ngo">
              <Form.Label>NGO</Form.Label>
              <Form.Control
                type="text"
                value={ngo}
                name="ngo"
                placeholder=""
                disabled
              />
            </Form.Group>
            <Button className="button" variant="primary" type="submit">
              Save changes
            </Button>{' '}
            <Button
              className="button"
              variant="danger"
              onClick={() => this.setState({ areYouSure: true })}
            >
              Delete profile
            </Button>{' '}
            {ngo && (
              <Button
                className="button"
                variant="primary"
                onClick={() => this.giveUpNgo()}
                disabled={!password}
              >
                Give up NGO.
              </Button>
            )}
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

export default withStore(VolunteerProfile);
