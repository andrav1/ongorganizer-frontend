import React, { Component } from 'react';
import { Table, Jumbotron, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { yesno } from '../utils/constants';
import './styles.css';
import { withStore } from '../helpers';
import moment from 'moment';

class ReviewApplications extends Component {
  state = {
    applications: [],
  };
  async componentDidMount() {
    const { store } = this.props;

    const applications = await store.projectStore.getApplications();
    this.setState({ applications });
  }
  async accept(app_id) {
    const { store } = this.props;
    const response = await store.projectStore.accept(app_id);

    const applications = await store.projectStore.getApplications();
    this.setState({ applications });
  }
  async refuse(app_id) {
    const { store } = this.props;
    const response = await store.projectStore.refuse(app_id);

    const applications = await store.projectStore.getApplications();
    this.setState({ applications });
  }
  mapApplicationsToJumbotrons(applications) {
    return applications.map(app => (
      <Jumbotron key={app.volunteer.id}>
        <Image src={app.volunteer.profile_picture} fluid />
        <h1>
          <b>{app.volunteer.name}</b>
        </h1>
        <p>Summary: {app.volunteer.summary}</p>
        <Button onClick={() => this.accept(app.id)} variant="success">
          Accept
        </Button>{' '}
        <Button onClick={() => this.refuse(app.id)} variant="danger">
          Decline
        </Button>
      </Jumbotron>
    ));
  }

  render() {
    const { applications } = this.state;

    return (
      <div className="wrapper">
        {applications && applications.length === 0 ? (
          <Jumbotron>
            <h1>Hello!</h1>
            <p>There are no new requests for you now!</p>
            <h2>Encourage your volunteers to apply to projects!</h2>
          </Jumbotron>
        ) : (
          this.mapApplicationsToJumbotrons(applications)
        )}
      </div>
    );
  }
}
export default withStore(ReviewApplications);
