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
    projects: [],
    project_applications: [],
    top3: [],
  };
  async componentDidMount() {
    const { store } = this.props;
    const ngo_applications = await store.statsStore.getAll();
    this.setState({ ngo_applications });
    const ngo = await store.authStore.getNGOProfile();
    this.setState({ ngo });
    const projects = await store.projectStore.getAll();
    this.setState({ projects });
    const project_applications = await store.projectStore.getApplications();
    this.setState({ project_applications });
    const top3 = this.state.projects.sort(
      (a, b) => a.applicants > b.applicants
    );
    this.setState({ top3 });
  }
  ProjectYearlyView(projects) {
    return [2019, 2020, 2021, 2022, 2023].map(score => ({
      score: String(score),
      points: projects.filter(x => moment(x.start_date).year() === score)
        .length,
    }));
  }
  ProjectMonthlyView(projects) {
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
    return months.map((score, index) => ({
      score: score,
      points: projects.filter(
        x =>
          moment().year() === moment(x.start_date).year() &&
          moment(x.start_date).month() === index
      ).length,
      pointsColor: 'hsl(117, 70%, 50%)',
    }));
  }
  ProjectDailyView(projects) {
    console.log(projects);
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
    ].map(score => {
      return {
        score: String(score),
        points: projects.filter(
          x =>
            moment().year() === moment(x.start_date).year() &&
            moment().month() === moment(x.start_date).month() &&
            moment(x.start_date).date() === score
        ).length,
        pointsColor: 'hsl(117, 70%, 50%)',
      };
    });
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
    return months.map((score, index) => ({
      score: score,
      points: ngo_applications.filter(
        x =>
          moment().year() === moment(x.date_added).year() &&
          moment(x.date_added).month() === index
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
          moment(x.date_added).date() === score
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
    const {
      ngo_applications,
      ngo,
      top3,
      project_applications,
      projects,
    } = this.state;
    console.log(project_applications);
    return (
      <div className="auth-wrapper">
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Recruitment statistics">
            <div id="recruitment_stats">
              <Container>
                <Row style={{ height: 50 }}>
                  <Col>
                    <h2>
                      Recruitment statistics on {moment().format('DD/MM/yyyy')}
                    </h2>
                  </Col>
                  <Col>
                    <div>
                      <Button
                        onClick={() => this.downloadPDF('recruitment_stats')}
                      >
                        Export as PDF
                      </Button>
                    </div>
                  </Col>
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
                      style={{ height: 300, width: 500 }}
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
                      style={{ height: 300, width: 500 }}
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
                    <div style={{ height: 300, width: 500 }}>
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
                    <div style={{ height: 300, width: 500 }}>
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
            <div id="projects_stats">
              <Container>
                <Row style={{ height: 50 }}>
                  <Col>
                    <h2>
                      Projects statistics on {moment().format('DD/MM/yyyy')}
                    </h2>
                  </Col>
                  <Col>
                    <div>
                      <Button
                        onClick={() => this.downloadPDF('projects_stats')}
                      >
                        Export as PDF
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <h5>Project frequency</h5>{' '}
                </Row>
                <Row>
                  <Col>
                    <h6>5 YEAR PERIOD</h6>
                    <div style={{ height: 300, width: 500 }}>
                      <ResponsiveBar
                        data={this.ProjectYearlyView(projects)}
                        bottomLabel="year"
                        leftLabel="projects"
                      />
                    </div>
                  </Col>
                  <Col>
                    <h5>Most popular projects</h5>{' '}
                    {top3 && top3.length !== 0 && (
                      <>
                        <h6>
                          <b>1. </b>
                          {top3[0].name} with {top3[0].applicants} applicants{' '}
                          <a href={`/feedback_statistics/?id=${top3[0].id}`}>
                            <i>See feedback statistics</i>
                          </a>{' '}
                        </h6>
                        <h6>
                          <b>2. </b>
                          {top3[1].name} with {top3[1].applicants} applicants{' '}
                          <a href={`/feedback_statistics/?id=${top3[1].id}`}>
                            <i>See feedback statistics</i>
                          </a>{' '}
                        </h6>
                        <h6>
                          <b>3. </b>
                          {top3[2].name} with {top3[2].applicants} applicants{' '}
                          <a href={`/feedback_statistics/?id=${top3[2].id}`}>
                            <i>See feedback statistics</i>
                          </a>{' '}
                        </h6>
                      </>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>THIS YEAR</h6>
                    <div style={{ height: 300, width: 800 }}>
                      <ResponsiveBar
                        data={this.ProjectMonthlyView(projects)}
                        bottomLabel="month"
                        leftLabel="projects"
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6>OPEN vs CLOSED PROJECTS</h6>
                    <div style={{ height: 300, width: 200 }}>
                      <ResponsivePie
                        data={[
                          {
                            id: 'open',
                            label: 'open',
                            value: projects.filter(x => x.open === true).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: 'closed',
                            label: 'closed',
                            value: projects.filter(x => x.open === false)
                              .length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>THIS MONTH</h6>
                    <div style={{ height: 300, width: 1000 }}>
                      <ResponsiveBar
                        data={this.ProjectDailyView(projects)}
                        bottomLabel="day"
                        leftLabel="projects"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Distribution of projects by duration</h6>
                    <div style={{ height: 300, width: 500 }}>
                      <ResponsivePie
                        data={[
                          {
                            id: '<1 day',
                            label: 'less than one day',
                            value: projects.filter(
                              x =>
                                moment(x.start_date).date() ===
                                moment(x.end_date).date()
                            ).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: '1-3 days',
                            label: '1-3 days',
                            value: projects.filter(
                              x =>
                                moment(x.end_date).diff(x.start_date, 'days') >
                                  0 &&
                                moment(x.end_date).diff(x.start_date, 'days') <=
                                  3
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '3-7 days',
                            label: '3-7 days',
                            value: projects.filter(
                              x =>
                                moment(x.end_date).diff(x.start_date, 'days') >
                                  3 &&
                                moment(x.end_date).diff(x.start_date, 'days') <=
                                  7
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '1-4 weeks',
                            label: '1-4 weeks',
                            value: projects.filter(
                              x =>
                                moment(x.end_date).diff(x.start_date, 'days') >
                                  7 &&
                                moment(x.end_date).diff(x.start_date, 'days') <=
                                  30
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '> 1 month',
                            label: 'more than 1 month',
                            value: projects.filter(
                              x =>
                                moment(x.end_date).diff(x.start_date, 'days') >=
                                31
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6>Distribution of projects by price</h6>
                    <div style={{ height: 300, width: 500 }}>
                      <ResponsivePie
                        data={[
                          {
                            id: 'free',
                            label: 'free',
                            value: projects.filter(
                              x => x.participation_fee === 0
                            ).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: '< 10 EUROS',
                            label: 'under 10 EUROS',
                            value: projects.filter(
                              x =>
                                x.participation_fee > 0 &&
                                x.participation_fee <= 10
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '10-50 EUROS',
                            label: '10-50 EUROS',
                            value: projects.filter(
                              x =>
                                x.participation_fee > 10 &&
                                x.participation_fee <= 50
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '> 50 EUROS',
                            label: 'over 50 EUROS',
                            value: projects.filter(
                              x => x.participation_fee > 50
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>{' '}
                </Row>
                <Row>
                  <Col>
                    <h6>Distribution of projects by offerings</h6>
                    <div style={{ height: 300, width: 500 }}>
                      <ResponsivePie
                        data={[
                          {
                            id: 'food',
                            label: 'just food',
                            value: projects.filter(
                              x =>
                                x.food_ensured === true &&
                                x.accommodation_ensured === false
                            ).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: 'accommodation',
                            label: 'just accommodation',
                            value: projects.filter(
                              x =>
                                x.food_ensured === false &&
                                x.accommodation_ensured === true
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: 'both',
                            label: 'both',
                            value: projects.filter(
                              x =>
                                x.food_ensured === true &&
                                x.accommodation_ensured === true
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: 'none',
                            label: 'none',
                            value: projects.filter(
                              x =>
                                x.food_ensured === false &&
                                x.accommodation_ensured === false
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>
                  <Col style={{ width: 200 }}></Col>
                  <Col>
                    <h6>Distribution of participants by offerings</h6>
                    <div style={{ height: 300, width: 500 }}>
                      <ResponsivePie
                        data={[
                          {
                            id: 'food',
                            label: 'just food',
                            value: project_applications.filter(
                              x =>
                                x.project.food_ensured === true &&
                                x.project.accommodation_ensured === false
                            ).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: 'accommodation',
                            label: 'just accommodation',
                            value: project_applications.filter(
                              x =>
                                x.project.food_ensured === false &&
                                x.project.accommodation_ensured === true
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: 'both',
                            label: 'both',
                            value: project_applications.filter(
                              x =>
                                x.project.food_ensured === true &&
                                x.project.accommodation_ensured === true
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: 'none',
                            label: 'none',
                            value: project_applications.filter(
                              x =>
                                x.project.food_ensured === false &&
                                x.project.accommodation_ensured === false
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Distribution of participants by price</h6>
                    <div style={{ height: 300, width: 500 }}>
                      <ResponsivePie
                        data={[
                          {
                            id: 'free',
                            label: 'free',
                            value: project_applications.filter(
                              x => x.project.participation_fee === 0
                            ).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: '< 10 EUROS',
                            label: 'under 10 EUROS',
                            value: project_applications.filter(
                              x =>
                                x.project.participation_fee > 0 &&
                                x.project.participation_fee <= 10
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '10-50 EUROS',
                            label: '10-50 EUROS',
                            value: project_applications.filter(
                              x =>
                                x.project.participation_fee > 10 &&
                                x.project.participation_fee <= 50
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '> 50 EUROS',
                            label: 'over 50 EUROS',
                            value: project_applications.filter(
                              x => x.project.participation_fee > 50
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>
                  <Col style={{ width: 200 }}></Col>
                  <Col>
                    <h6>Distribution of participants by duration</h6>
                    <div style={{ height: 300, width: 500 }}>
                      <ResponsivePie
                        data={[
                          {
                            id: '<1 day',
                            label: 'less than one day',
                            value: project_applications.filter(
                              x =>
                                moment(x.project.start_date).date() ===
                                moment(x.project.end_date).date()
                            ).length,
                            color: 'hsl(127, 70%, 50%)',
                          },
                          {
                            id: '1-3 days',
                            label: '1-3 days',
                            value: project_applications.filter(
                              x =>
                                moment(x.project.end_date).diff(
                                  x.project.start_date,
                                  'days'
                                ) > 0 &&
                                moment(x.project.end_date).diff(
                                  x.project.start_date,
                                  'days'
                                ) <= 3
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '3-7 days',
                            label: '3-7 days',
                            value: project_applications.filter(
                              x =>
                                moment(x.project.end_date).diff(
                                  x.project.start_date,
                                  'days'
                                ) > 3 &&
                                moment(x.project.end_date).diff(
                                  x.project.start_date,
                                  'days'
                                ) <= 7
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '1-4 weeks',
                            label: '1-4 weeks',
                            value: project_applications.filter(
                              x =>
                                moment(x.project.end_date).diff(
                                  x.project.start_date,
                                  'days'
                                ) > 7 &&
                                moment(x.project.end_date).diff(
                                  x.project.start_date,
                                  'days'
                                ) <= 30
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                          {
                            id: '> 1 month',
                            label: 'more than 1 month',
                            value: project_applications.filter(
                              x =>
                                moment(x.project.end_date).diff(
                                  x.project.start_date,
                                  'days'
                                ) >= 31
                            ).length,
                            color: 'hsl(131, 70%, 50%)',
                          },
                        ]}
                      />
                    </div>
                  </Col>
                </Row>
              </Container>{' '}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
export default withStore(Statistics);
