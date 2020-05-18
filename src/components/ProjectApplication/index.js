import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { yesno } from '../utils/constants';
import './styles.css';
import { withStore } from '../helpers';
import moment from 'moment';

class Register extends Component {
  state = {
    applications: [],
    id: 0,
    areYouSure: false,
  };
  async componentDidMount() {
    const { store } = this.props;

    const applications = await store.projectStore.getApplications();
    this.setState({ applications });
  }
  async giveUp(id) {
    const { store } = this.props;
    await store.projectStore.giveUp(id);
    window.location.reload();
    return this.props.history.push('/my_projects');
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
        let i = index;
        row.push(
          <div>
            <p>
              {'Project:' +
                accepted[index].project.name +
                ' on: ' +
                moment(accepted[index].project.start_date).format(
                  '(ddd) DD-MM-YYYY hh:mm'
                )}
            </p>
            {accepted[index].project.open && (
              <Button
                variant="danger"
                onClick={() => {
                  this.setState({ areYouSure: true, id: accepted[i].id });
                }}
                className="sm"
              >
                {' '}
                X
              </Button>
            )}
          </div>
        );
      } else {
        row.push('');
      }

      if (declined[index]) {
        let i = index;
        row.push(
          <div>
            <p>
              {'Project:' +
                declined[index].project.name +
                ' on: ' +
                moment(declined[index].project.start_date).format(
                  '(ddd) DD-MM-YYYY hh:mm'
                )}
            </p>
          </div>
        );
      } else {
        row.push('');
      }

      if (pending[index]) {
        let i = index;
        row.push(
          <div>
            <p>
              {'Project:' +
                pending[index].project.name +
                ' on: ' +
                moment(pending[index].project.start_date).format(
                  '(ddd) DD-MM-YYYY hh:mm'
                )}
            </p>
            {pending[index].project.open && (
              <Button
                variant="danger"
                onClick={() => {
                  this.setState({ areYouSure: true, id: pending[i].id });
                }}
                className="sm"
              >
                {' '}
                X
              </Button>
            )}
          </div>
        );
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
    const { applications, id, areYouSure } = this.state;

    return (
      <div className="wrapper">
        <Modal
          show={areYouSure}
          onHide={() => this.setState({ areYouSure: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Hey, you're about to give up on this project. You've worked so hard
            on it. Are you sure?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => this.giveUp({ id })}>
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
