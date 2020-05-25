import React, { Component } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { yesno } from '../utils/constants';
import './styles.css';
import { withStore } from '../helpers';
import moment from 'moment';

class SeeVolunteers extends Component {
  state = {
    volunteers: [],
  };
  async componentDidMount() {
    const { store } = this.props;

    const volunteers = await store.dashboardStore.getVolunteers();
    this.setState({ volunteers });
  }

  mapToList(volunteers) {
    return volunteers.map(vol => (
      <>
        {/* <h3>{vol.name}</h3>
        <p>Contact: {vol.user.email}</p>
        <div id="line">
          <hr />
        </div> */}
        <Card>
          <Card.Header></Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <b>{vol.name}</b>
              <small> -------> Contact: {vol.user.email}</small>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </>
    ));
  }

  render() {
    const { volunteers } = this.state;

    return (
      <div className="wrapper">
        <Accordion defaultActiveKey="0">
          {this.mapToList(volunteers)}{' '}
        </Accordion>
      </div>
    );
  }
}
export default withStore(SeeVolunteers);
