import React, { Component } from 'react';
import {
  Form,
  Button,
  Alert,
  Modal,
  Jumbotron,
  Dropdown,
  Image,
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
    food_ensured: false,
    accommodation_ensured: false,
    start_date: '',
    end_date: '',
    application_deadline: '',
    participation_fee: '',
    description: '',
    areYouSure: false,
    projects: [],
    showMap: false,
    current_location: '',
    add: false,
    price_min: 0,
    period: Infinity,
    participant_min: 0,
    participant_max: Infinity,
    price_max: Infinity,
    see_participants: false,
    open: true,
    update: false,
    update_id: '',
    display_participants: [],
    error: {},
  };
  async componentDidMount() {
    const { store } = this.props;

    const projects = await store.projectStore.getAll();
    this.setState({ projects });
  }
  handleChange(event) {
    const {
      target: { value, name, checked, type },
    } = event;

    if (type === 'checkbox') {
      return this.setState({
        [name]: checked,
      });
    }
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
  async handleSubmitForm(event) {
    try {
      event.preventDefault();
      const { store } = this.props;

      await store.projectStore.addProject(this.state);
      this.setState({ add: false });
      window.location.reload();

      return this.props.history.push('/project');
    } catch (error) {
      document.getElementById('add-project').reset();
      console.log(error);
      this.setState({
        error: error.response.data,
      });
      window.scrollTo(0, 0);

      setTimeout(() => this.setState({ error: {} }), 3000);
    }
  }
  async handleSubmitFormUpdate(event) {
    try {
      event.preventDefault();
      const { store } = this.props;

      await store.projectStore.updateProject(this.state);
      this.setState({ update: false });
      window.location.reload();

      return this.props.history.push('/project');
    } catch (error) {
      document.getElementById('update-project').reset();
      console.log(error);
      this.setState({
        error: error.response.data,
      });
      window.scrollTo(0, 0);

      setTimeout(() => this.setState({ error: {} }), 3000);
    }
  }
  async applyToProject(id) {
    const { store } = this.props;
    await store.projectStore.apply(id);
    return this.props.history.push('/my_projects');
  }
  async seeParticipants(id) {
    const { store } = this.props;
    const participants = await store.projectStore.getAllParticipants({ id });
    console.log(participants);
    this.setState({
      see_participants: true,
      display_participants: participants,
    });
    console.log(this.state);
  }
  render() {
    const {
      id,
      name,
      location,
      participant_number,
      food_ensured,
      accommodation_ensured,
      display_participants,
      start_date,
      end_date,
      application_deadline,
      participation_fee,
      description,
      projects,
      see_participants,
      add,
      areYouSure,
      period,
      showMap,
      price_min,
      price_max,
      update,
      update_id,
      open,
      participant_max,
      participant_min,
      current_location,
      error,
    } = this.state;
    console.log(projects);
    return (
      <div className="wrapper">
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
          {localStorage.getItem('role') === 'ngo' && (
            <Button
              className="filter"
              variant="success"
              onClick={() => this.setState({ add: true })}
            >
              ADD Project
            </Button>
          )}
        </div>
        <Modal
          show={see_participants}
          onHide={() =>
            this.setState({ see_participants: false, display_participants: [] })
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Participants</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {display_participants.map(participant => (
              <p>{participant.name}</p>
            ))}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        <Modal show={update} onHide={() => this.setState({ update: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Update project informations</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              id="update-project"
              onSubmit={event => this.handleSubmitFormUpdate(event)}
            >
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Project name"
                  onChange={event => this.handleChange(event)}
                  name="name"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  placeholder="Project location"
                  onChange={event => this.handleChange(event)}
                  name="location"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  value={participant_number}
                  placeholder="How many people can participate?"
                  onChange={event => this.handleChange(event)}
                  name="participant_number"
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Food ensured"
                  checked={food_ensured}
                  name="food_ensured"
                  onChange={event => this.handleChange(event)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox1">
                <Form.Check
                  type="checkbox"
                  label="Accommodation ensured"
                  checked={accommodation_ensured}
                  name="accommodation_ensured"
                  onChange={event => this.handleChange(event)}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput5">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={start_date}
                  name="start_date"
                  placeholder="zz/ll/aaaa hh:mm AM/PM"
                  onChange={event => this.handleChange(event)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput6">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={end_date}
                  name="end_date"
                  placeholder="zz/ll/aaaa hh:mm AM/PM"
                  onChange={event => this.handleChange(event)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput7">
                <Form.Label>Application deadline</Form.Label>
                <Form.Control
                  type="date"
                  value={application_deadline}
                  name="application_deadline"
                  placeholder="zz/ll/aaaa"
                  onChange={event => this.handleChange(event)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput8">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  placeholder="Project description"
                  onChange={event => this.handleChange(event)}
                  name="description"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput9">
                <Form.Label>Participation Fee</Form.Label>
                <Form.Control
                  type="number"
                  value={participation_fee}
                  placeholder="Participation fee (in EUR)"
                  onChange={event => this.handleChange(event)}
                  name="participation_fee"
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            Be aware that the capacity of the project can not be reduced in
            order to avoid complications.
          </Modal.Footer>
        </Modal>
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
        <Modal show={add} onHide={() => this.setState({ add: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              id="add-project"
              onSubmit={event => this.handleSubmitForm(event)}
            >
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Project name"
                  onChange={event => this.handleChange(event)}
                  name="name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  placeholder="Project location"
                  onChange={event => this.handleChange(event)}
                  name="location"
                  required
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  value={participant_number}
                  placeholder="How many people can participate?"
                  onChange={event => this.handleChange(event)}
                  name="participant_number"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Food ensured"
                  checked={food_ensured}
                  name="food_ensured"
                  onChange={event => this.handleChange(event)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox1">
                <Form.Check
                  type="checkbox"
                  label="Accommodation ensured"
                  checked={accommodation_ensured}
                  name="accommodation_ensured"
                  onChange={event => this.handleChange(event)}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput5">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={start_date}
                  name="start_date"
                  placeholder="zz/ll/aaaa hh:mm AM/PM"
                  onChange={event => this.handleChange(event)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput6">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={end_date}
                  name="end_date"
                  placeholder="zz/ll/aaaa hh:mm AM/PM"
                  onChange={event => this.handleChange(event)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput7">
                <Form.Label>Application deadline</Form.Label>
                <Form.Control
                  type="date"
                  value={application_deadline}
                  name="application_deadline"
                  placeholder="zz/ll/aaaa"
                  onChange={event => this.handleChange(event)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput8">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  placeholder="Project description"
                  onChange={event => this.handleChange(event)}
                  name="description"
                  required
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput9">
                <Form.Label>Participation Fee</Form.Label>
                <Form.Control
                  type="number"
                  value={participation_fee}
                  placeholder="Participation fee (in EUR)"
                  onChange={event => this.handleChange(event)}
                  name="participation_fee"
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Add
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {error.non_field_errors && (
              <Alert variant="danger">{error.non_field_errors[0]}</Alert>
            )}
          </Modal.Footer>
        </Modal>
        {error.non_field_errors && (
          <Alert variant="danger">{error.non_field_errors[0]}</Alert>
        )}
        <div className="wraper-inner">
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
                    <>
                      {localStorage.getItem('role') === 'ngo' && open && (
                        <Button
                          variant="danger"
                          onClick={() =>
                            this.setState({ areYouSure: true, id: project.id })
                          }
                        >
                          Delete Project
                        </Button>
                      )}
                      {localStorage.getItem('role') === 'volunteer' &&
                        open && (
                          <Button
                            variant="success"
                            onClick={() => this.applyToProject(project.id)}
                          >
                            Apply
                          </Button>
                        )}{' '}
                      {localStorage.getItem('role') === 'ngo' && (
                        <Button
                          variant="primary"
                          onClick={() => this.seeParticipants(project.id)}
                        >
                          See participants
                        </Button>
                      )}{' '}
                      {localStorage.getItem('role') === 'ngo' && (
                        <Button
                          variant="primary"
                          className="margin"
                          onClick={() => {
                            console.log(
                              project.start_date,
                              project.end_date,
                              project.application_deadline
                            );
                            this.setState({
                              update: true,
                              update_id: project.id,
                              name: project.name,
                              location: project.location,
                              participant_number: project.participant_number,
                              food_ensured: project.food_ensured,
                              accommodation_ensured:
                                project.accommodation_ensured,
                              start_date: moment(project.start_date).format(
                                'YYYY-MM-DDThh:mm'
                              ),
                              end_date: moment(project.start_date).format(
                                'YYYY-MM-DDThh:mm'
                              ),
                              application_deadline: moment(
                                project.application_deadline
                              ).format('YYYY-MM-DD'),
                              participation_fee: project.participation_fee,
                              description: project.description,
                            });
                          }}
                        >
                          Update project details
                        </Button>
                      )}
                    </>
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
