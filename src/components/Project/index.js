import React, { Component } from 'react';
import { Form, Button, Alert, Modal, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { yesno } from '../utils/constants';
import './styles.css';
import { withStore } from '../helpers';
import moment from 'moment';
class Register extends Component {
  state = {
    name: '',
    location: '',
    participant_number: '',
    food_ensured: '',
    accommodation_ensured: '',
    start_date: '',
    end_date: '',
    application_deadline: '',
    participation_fee: '',
    description: '',
    areYouSure: false,
    projects: [],
    error: {},
  };
  async componentDidMount() {
    const { store } = this.props;

    const projects = await store.projectStore.getAll();
    this.setState({ projects });
  }
  handleChange(event) {
    const {
      target: { value, name },
    } = event;

    return this.setState({
      [name]: value,
    });
  }

  async deleteProject() {
    const { store } = this.props;
    await store.projectStore.deleteProject();
    window.location.reload();
    return this.props.history.push('/project');
  }

  render() {
    const {
      name,
      location,
      participant_number,
      food_ensured,
      accommodation_ensured,
      start_date,
      end_date,
      application_deadline,
      participation_fee,
      description,
      projects,
      areYouSure,
      error,
    } = this.state;
    console.log(projects);
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
            Hey, you're about to delete this project. You've worked so hard on
            it. Are you sure?
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
        <div className="auth-inner">
          {projects && projects.length === 0 ? (
            <Jumbotron>
              <h1>Hello!</h1>
              <p>
                There seem to be no projects available for you now! Check again
                later!
              </p>
              <h2>Check again later! </h2>
            </Jumbotron>
          ) : (
            projects.map(project => {
              return (
                <Jumbotron key={project.id}>
                  <h1>
                    <b>{project.name}</b>
                  </h1>
                  <h4>{project.description}</h4>
                  <p>
                    Spots left: {project.spots_left}/
                    {project.participant_number}
                  </p>
                  <p>
                    {' '}
                    Starts on:{' '}
                    {moment(project.start_date).format(
                      '(ddd) DD-MM-YYYY hh:mm'
                    )}{' '}
                  </p>
                  <p>
                    Ends on:{' '}
                    {moment(projects.end_date).format('(ddd) DD-MM-YYYY hh:mm')}
                  </p>
                  <p>
                    Will we ensure accommodation?{' '}
                    {yesno[project.accommodation_ensured]}
                  </p>
                  <p>Will we ensure food? {yesno[project.food_ensured]}</p>
                  <p>Participation fee: {project.participation_fee} EUR </p>
                  <p>Location: {project.location}</p>
                  <p>
                    Apply before{' '}
                    {moment(project.application_deadline).format(
                      '(ddd) DD-MM-YYYY hh:mm'
                    )}
                  </p>
                </Jumbotron>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default withStore(Register);
