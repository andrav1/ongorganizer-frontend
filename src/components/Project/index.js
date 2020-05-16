import React, { Component } from 'react';
import {
  Form,
  Button,
  Alert,
  Modal,
  Jumbotron,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { yesno } from '../utils/constants';
import './styles.css';
import { withStore } from '../helpers';
import moment from 'moment';
import Map from '../Map';
class Register extends Component {
  state = {
    id: '',
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
    showMap: false,
    current_location: '',
    price_min: 0,
    period: Infinity,
    participant_min: 0,
    participant_max: Infinity,
    price_max: Infinity,

    open: true,
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

  async deleteProject(id) {
    const { store } = this.props;
    await store.projectStore.deleteProject(id);
    window.location.reload();
    return this.props.history.push('/project');
  }

  render() {
    const {
      id,
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
      period,
      showMap,
      price_min,
      price_max,
      open,
      participant_max,
      participant_min,
      current_location,
      error,
    } = this.state;
    console.log(projects);
    return (
      <div className="auth-wrapper">
        <div className="filter-div">
          <DropdownButton
            className="filter"
            as={ButtonGroup}
            size="sm"
            variant="secondary"
            title="Filter by availability"
          >
            <Dropdown.Item
              onClick={() => {
                this.setState({ open: true });
              }}
              active={open === true}
            >
              Open
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ open: false });
              }}
              active={open === false}
            >
              Past projects
            </Dropdown.Item>
          </DropdownButton>{' '}
          <DropdownButton
            className="filter"
            as={ButtonGroup}
            size="sm"
            variant="secondary"
            title="Filter by fee"
          >
            <Dropdown.Item
              onClick={() => {
                this.setState({ price_min: 0, price_max: Infinity });
              }}
              active={price_min === 0 && price_max === Infinity}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ price_min: 0, price_max: 5 });
              }}
              active={price_min === 0 && price_max === 5}
            >
              Under 5 EURO
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ price_min: 5, price_max: 25 });
              }}
              active={price_min === 5 && price_max === 25}
            >
              Between 5 and 25 EURO
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ price_min: 25, price_max: 75 });
              }}
              active={price_min === 25 && price_max === 75}
            >
              Between 25 and 75 EURO
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ price_min: 75, price_max: Infinity });
              }}
              active={price_min === 75 && price_max === Infinity}
            >
              Over 75 EURO
            </Dropdown.Item>
          </DropdownButton>{' '}
          <DropdownButton
            className="filter"
            as={ButtonGroup}
            size="sm"
            variant="secondary"
            title="Filter by capacity"
          >
            <Dropdown.Item
              onClick={() => {
                this.setState({
                  participant_min: 0,
                  participant_max: Infinity,
                });
              }}
              active={participant_min === 0 && participant_max === Infinity}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ participant_min: 0, participant_max: 10 });
              }}
              active={participant_min === 0 && participant_max === 10}
            >
              Under 10 participants
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ participant_min: 10, participant_max: 35 });
              }}
              active={participant_min === 10 && participant_max === 35}
            >
              Between 10 and 35 participants
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ participant_min: 35, participant_max: 50 });
              }}
              active={participant_min === 35 && participant_max === 50}
            >
              Between 35 and 50 participants
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({
                  participant_min: 50,
                  participant_max: Infinity,
                });
              }}
              active={participant_min === 50 && participant_max === Infinity}
            >
              Over 50 participants
            </Dropdown.Item>
          </DropdownButton>{' '}
          <DropdownButton
            className="filter"
            as={ButtonGroup}
            size="sm"
            variant="secondary"
            title="Filter by period"
          >
            <Dropdown.Item
              onClick={() => {
                this.setState({ period: Infinity });
              }}
              active={period === Infinity}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ period: 7 });
              }}
              active={period === 7}
            >
              This week
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ period: 30 });
              }}
              active={period === 30}
            >
              This month
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ period: 365 });
              }}
              active={period === 365}
            >
              This year
            </Dropdown.Item>
          </DropdownButton>{' '}
        </div>
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
            <Button variant="danger" onClick={() => this.deleteProject({ id })}>
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
        <Modal show={showMap} onHide={() => this.setState({ showMap: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Project Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Map address={current_location} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.setState({ showMap: false })}
            >
              Close
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
            projects
              .filter(
                project =>
                  project.open === open &&
                  project.participation_fee >= price_min &&
                  project.participation_fee < price_max &&
                  project.participant_number >= participant_min &&
                  project.participant_number < participant_max &&
                  (new Date(project.start_date) - new Date()) /
                    1000 /
                    60 /
                    60 /
                    24 <=
                    period
              )
              .map(project => {
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
                      {moment(projects.end_date).format(
                        '(ddd) DD-MM-YYYY hh:mm'
                      )}
                    </p>
                    <p>
                      Will we ensure accommodation?{' '}
                      {yesno[project.accommodation_ensured]}
                    </p>
                    <p>Will we ensure food? {yesno[project.food_ensured]}</p>
                    <p>Participation fee: {project.participation_fee} EUR </p>
                    <p>Location: {project.location}</p>
                    <Button
                      variant="primary"
                      onClick={() =>
                        this.setState({
                          showMap: true,
                          current_location: project.location,
                        })
                      }
                    >
                      Show on map
                    </Button>
                    <p>
                      Apply before{' '}
                      {moment(project.application_deadline).format(
                        '(ddd) DD-MM-YYYY hh:mm'
                      )}
                    </p>
                    {localStorage.getItem('role') === 'ngo' && (
                      <Button
                        variant="danger"
                        onClick={() =>
                          this.setState({ areYouSure: true, id: project.id })
                        }
                      >
                        Delete Project
                      </Button>
                    )}
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
