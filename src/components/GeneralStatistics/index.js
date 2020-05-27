import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Tabs, Button, Tab, Col, Row } from 'react-bootstrap';

import { withStore } from '../helpers';
import ResponsiveBar from '../Statistics/responsivebar';
import ResponsivePie from '../Statistics/piechart';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class Statistics extends Component {
  state = {
    ngo_applications: [],
    ngo: '',
  };
  async componentDidMount() {
    const { store } = this.props;
    const ngo_applications = await store.statsStore.getAll();
    this.setState({ ngo_applications });
    const ngo = await store.authStore.getNGOProfile();
    this.setState({ ngo });
  }
  YearlyView(ngo_applications) {
    return [2019, 2020, 2021, 2022, 2023].map(score => ({
      score: String(score),
      points: ngo_applications.filter(
        x => moment(x.date_added).year() === score
      ).length,
    }));
  }
  MonthlyView(ngo_applications) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months.map(score => ({
      score: score,
      points: ngo_applications.filter(
        x =>
          moment().year() === moment(x.date_added).year() &&
          moment(x.date_added).month() === months.indexOf(score) + 1
      ).length,
      pointsColor: 'hsl(117, 70%, 50%)',
    }));
  }
  DailyView(ngo_applications) {
    return [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ].map(score => ({
      score: String(score),
      points: ngo_applications.filter(
        x =>
          moment().year() === moment(x.date_added).year() &&
          moment().month() === moment(x.date_added).month() &&
          moment(x.date_added).day() === score
      ).length,
      pointsColor: 'hsl(117, 70%, 50%)',
    }));
  }
  async downloadPDF(id) {
    const all = document.getElementById(id);

    const canva = await html2canvas(all);
    const pdf = new jsPDF();
    pdf.addImage(canva.toDataURL('image/png'), 'JPEG', 0, 0, 210, 297);
    pdf.save(`${id}.pdf`);
  }
  render() {
    const { ngo_applications, ngo } = this.state;
    console.log(ngo_applications);
    return (
      <div className="auth-wrapper">
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Recruitment statistics">
            <div id="recruitment_stats">
              <Container>
                <Row style={{ height: 50 }}>
                  <h2>
                    Recruitment statistics on {moment().format('DD/MM/yyyy')}
                  </h2>
                  <div>
                    <Button
                      onClick={() => this.downloadPDF('recruitment_stats')}
                    >
                      Export as PDF
                    </Button>
                  </div>
                </Row>
                <Row>
                  <Col>
                    <h6>5 YEAR PERIOD</h6>
                    <div style={{ height: 300, width: 500 }}>
                      <ResponsiveBar
                        data={this.YearlyView(ngo_applications)}
                        bottomLabel="year"
                        leftLabel="new recruits"
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6>THIS YEAR</h6>
                    <div style={{ height: 300, width: 800 }}>
                      <ResponsiveBar
                        data={this.MonthlyView(ngo_applications)}
                        bottomLabel="month"
                        leftLabel="new recruits"
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6>THIS MONTH</h6>
                    <div style={{ height: 300, width: 1000 }}>
                      <ResponsiveBar
                        data={this.DailyView(ngo_applications)}
                        bottomLabel="day"
                        leftLabel="new recruits"
                      />
                    </div>
                  </Col>{' '}
                  <Col>
                    <div
                      id="status_distribution"
                      style={{ height: 300, width: 400 }}
                    >
                      <ResponsivePie
                        data={[
                          {
                            id: 'accepted',
                            label: 'accepted',
                            value: ngo_applications.filter(
                              x => x.status === 'accepted'
                            ).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: 'rejected',
                            label: 'rejected',
                            value: ngo_applications.filter(
                              x => x.status === 'declined'
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: 'pending',
                            label: 'pending',
                            value: ngo_applications.filter(
                              x => x.status === 'pending'
                            ).length,
                            color: 'hsl(100, 70%, 50%)',
                          },
                          {
                            id: 'gave up',
                            label: 'gave_up',
                            value: ngo.volunteers_who_gave_up,
                            color: 'hsl(337, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6>Distribution by gender </h6>
                    <div
                      id="gender_distribution"
                      style={{ height: 300, width: 400 }}
                    >
                      <ResponsivePie
                        data={[
                          {
                            id: 'female',
                            label: 'female',
                            value: ngo_applications.filter(
                              x => x.volunteer.gender === 'F'
                            ).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: 'male',
                            label: 'male',
                            value: ngo_applications.filter(
                              x => x.volunteer.gender === 'M'
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6>Distribution by age </h6>
                    <div style={{ height: 300, width: 700 }}>
                      <ResponsivePie
                        data={[
                          {
                            id: 'under 15',
                            label: 'under 15',
                            value: ngo_applications.filter(
                              x =>
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() <
                                15
                            ).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: '15-25',
                            label: '15-25',
                            value: ngo_applications.filter(
                              x =>
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() >=
                                  15 &&
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() <
                                  25
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '15-25',
                            label: '15-25',
                            value: ngo_applications.filter(
                              x =>
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() >=
                                  25 &&
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() <
                                  35
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '25-35',
                            label: '25-35',
                            value: ngo_applications.filter(
                              x =>
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() >=
                                  25 &&
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() <
                                  35
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '35-45',
                            label: '35-45',
                            value: ngo_applications.filter(
                              x =>
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() >=
                                  35 &&
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() <
                                  45
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '45-55',
                            label: '45-55',
                            value: ngo_applications.filter(
                              x =>
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() >=
                                  45 &&
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() <
                                  55
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: 'over 55',
                            label: 'over 55',
                            value: ngo_applications.filter(
                              x =>
                                moment().year() -
                                  moment(x.volunteer.birth_date).year() >
                                55
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6>Distribution by experience </h6>
                    <div style={{ height: 300, width: 700 }}>
                      <ResponsivePie
                        data={[
                          {
                            id: 'none',
                            label: 'no experience',
                            value: ngo_applications.filter(
                              x => x.volunteer.years_of_experience === 0
                            ).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: 'under 5 y',
                            label: 'under 5 years ',
                            value: ngo_applications.filter(
                              x => x.volunteer.years_of_experience < 5
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '5 -10 y',
                            label: 'between 5 and 10 years',
                            value: ngo_applications.filter(
                              x =>
                                x.volunteer.years_of_experience >= 5 &&
                                x.volunteer.years_of_experience < 10
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: 'over 10 y ',
                            label: 'over 10 years ',
                            value: ngo_applications.filter(
                              x => x.volunteer.years_of_experience >= 10
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Tab>

          <Tab eventKey="prj" title="Projects statistics">
            <Container></Container>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
export default withStore(Statistics);
