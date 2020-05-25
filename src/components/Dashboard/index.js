import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert, Card, Jumbotron, Image } from 'react-bootstrap';

import './styles.css';
import { withStore } from '../helpers';
import { activityDomain, gender } from '../utils/constants';

class Dashboard extends Component {
  state = {
    entities: [],
  };

  async componentDidMount() {
    const { store } = this.props;

    const entities = await store.dashboardStore.getAll();
    this.setState({ entities });
  }
  async accept(volunteer_id) {
    const { store } = this.props;
    const response = await store.dashboardStore.accept(volunteer_id);
    console.log(response);
    const entities = await store.dashboardStore.getAll();
    this.setState({ entities });
  }
  async refuse(volunteer_id) {
    const { store } = this.props;
    const response = await store.dashboardStore.refuse(volunteer_id);
    console.log(response);
    const entities = await store.dashboardStore.getAll();
    this.setState({ entities });
  }
  async apply(ngo_id) {
    const { store } = this.props;
    const response = await store.dashboardStore.apply(ngo_id);
    console.log(response);
    const entities = await store.dashboardStore.getAll();
    this.setState({ entities });
  }
  mapNGOsToCards(ngos) {
    return ngos.map(ngo => (
      <Jumbotron key={ngo.id}>
        <h1>
          <b>{ngo.name}</b>
        </h1>
        <p>It is managed by {ngo.legal_person}</p>
        <p>They describe themselves as: {ngo.summary}</p>
        <p>They have their main center on {ngo.address}</p>
        <p>Reach them by email {ngo.user.email}</p>
        <p>
          Check more about them on their website before you make a choice:{' '}
          <a href={ngo.website}> {ngo.name}</a>{' '}
        </p>
        <Button onClick={() => this.apply(ngo.id)} variant="primary">
          Apply to this ngo!
        </Button>
      </Jumbotron>
    ));
  }

  mapVolunteersToCards(volunteers) {
    console.log(volunteers);
    return volunteers.map(volunteer => (
      <Jumbotron key={volunteer.id}>
        <Image src={volunteer.profile_picture} fluid />
        <h1>
          <b>{volunteer.name}</b>
        </h1>
        <p>
          {gender[volunteer.gender]} summary is: {volunteer.summary}
        </p>
        <p>Years of experience: {volunteer.years_of_experience} </p>
        <Button onClick={() => this.accept(volunteer.id)} variant="success">
          Accept
        </Button>{' '}
        <Button onClick={() => this.refuse(volunteer.id)} variant="danger">
          Decline
        </Button>
      </Jumbotron>
    ));
  }

  render() {
    const { entities } = this.state;
    console.log(this.state);
    return (
      <div>
        {entities && entities.length === 0 ? (
          <Jumbotron>
            <h1>Hello!</h1>
            <p>Unfortunately there is nothing new for you right now!</p>
            <h2>
              Go check the other features of our app or check again for news
              later!
            </h2>
          </Jumbotron>
        ) : entities[0].hasOwnProperty('accepted') ? (
          this.mapVolunteersToCards(entities)
        ) : (
          <div>
            {' '}
            <h1>We found some great matches for you!</h1>
            <h2>
              {' '}
              These ngos are all interested in{' '}
              {activityDomain[entities[0].activity_domain]} matters
            </h2>{' '}
            {this.mapNGOsToCards(entities)}
          </div>
        )}
      </div>
    );
  }
}

export default withStore(Dashboard);
