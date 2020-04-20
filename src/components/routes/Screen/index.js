import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import { withStore } from '../../common/Helpers';

import './styles';

class Screen extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Do you already have an account?</h1>
              <p>What are you waiting for, then? Your ngo needs you!</p>
              <p>
                <Button href="/Login" variant="primary">
                  Login
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Do you wanna be a volunteer?</h1>
              <p>
                Did you always want to find an ngo that suits your volunteering
                needs? That combines your passions with your skills? You're in
                the right place. Find an NGO that suits you!
              </p>
              <p>
                <Button href="/RegisterVolunteer" variant="primary">
                  Register as a volunteer
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <Jumbotron>
              <h1>
                Do you have an NGO in need of digital organizational workspace?
              </h1>
              <p>
                Register your NGO here to save a lot of time with organizational
                stuff. We know that sometimes that is hard to deal with. We're
                here to make it easier!
              </p>
              <p>
                <Button href="/RegisterNGO" variant="primary">
                  Register as an NGO
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withStore(Screen);
