import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { yesno } from '../utils/constants';
import './styles.css';
import { withStore } from '../helpers';
import moment from 'moment';

class Register extends Component {
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
        <h3>{vol.name}</h3>
        <p>Contact: {vol.user.email}</p>
        <div id="line">
          <hr />
        </div>
      </>
    ));
  }

  render() {
    const { volunteers } = this.state;

    return <div className="wrapper">{this.mapToList(volunteers)}</div>;
  }
}
export default withStore(Register);
