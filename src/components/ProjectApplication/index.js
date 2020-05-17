import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { yesno } from '../utils/constants';
import './styles.css';
import { withStore } from '../helpers';
import moment from 'moment';

class Register extends Component {
  state = {
    applications: [],
    id: 0,
  };
  async componentDidMount() {
    const { store } = this.props;

    const applications = await store.projectStore.getApplications();
    this.setState({ applications });
  }

  mapToTableCells(applications) {
    const accepted = applications.filter(app => app.status === 'accepted');
    const pending = applications.filter(app => app.status === 'pending');
    const declined = applications.filter(app => app.status === 'declined');

    let index = 0;
    let table = [];
    console.log(Math.max(accepted.length, declined.length, pending.length));

    while (index < Math.max(accepted.length, declined.length, pending.length)) {
      let row = [];
      if (accepted[index]) {
        row.push('Project: ' + accepted[index].project.name);
      } else {
        row.push('');
      }

      if (declined[index]) {
        row.push('Project: ' + declined[index].project.name);
      } else {
        row.push('');
      }

      if (pending[index]) {
        row.push('Project: ' + pending[index].project.name);
      } else {
        row.push('');
      }

      table.push(row);
      index += 1;
    }

    return table.map(row => {
      return (
        <tr>
          <td>{row[0]}</td>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
        </tr>
      );
    });
  }

  render() {
    const { applications, id } = this.state;

    return (
      <div className="wrapper">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="accepted">ACCEPTED</th>
              <th className="declined">DECLINED</th>
              <th className="pending">PENDING</th>
            </tr>
          </thead>
          <tbody>{this.mapToTableCells(applications)}</tbody>
        </Table>
      </div>
    );
  }
}
export default withStore(Register);
