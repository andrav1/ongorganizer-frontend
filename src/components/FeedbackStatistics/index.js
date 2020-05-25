import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Jumbotron, Card, Col, Row } from 'react-bootstrap';
import './styles.css';
import { withStore } from '../helpers';
import ResponsiveBar from '../Statistics/responsivebar';
import ResponsivePie from '../Statistics/piechart';
class FeedbackStatistics extends Component {
  state = {
    questions: [],
    answers: [],
    project: '',
    overall_mean: 0,
    error: false,
  };
  async componentDidMount() {
    const { store } = this.props;
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get('id');
    console.log(id);
    const project = await store.projectStore.getProject({ id });
    this.setState({ project });
    const answers = await store.projectStore.getAnswers({ id });
    this.setState({ answers });
    const questions = await store.projectStore.getQuestions();
    this.setState({ questions });

    const total = answers.filter(a => a.question.type === 1).length;
    const sum = answers
      .filter(a => a.question.type === 1)
      .reduce((sum, x) => (sum += x.answer), 0);
    if (total === 0) {
      this.setState({ overall_mean: 0 });
    } else {
      this.setState({ overall_mean: sum / total });
    }
  }

  mapAnswersToStatistics(answers, category) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => ({
      score: String(score),
      points: answers.filter(
        x => x.answer === score && x.question.category === category
      ).length,
      pointsColor: 'hsl(63, 70%, 50%)',
    }));
  }

  get_mean_by_category(category) {
    const total = this.state.answers.filter(
      a => a.question.type === 1 && a.question.category === category
    ).length;
    const sum = this.state.answers
      .filter(a => a.question.type === 1 && a.question.category === category)
      .reduce((sum, x) => (sum += x.answer), 0);
    if (total === 0) {
      return 0;
    } else {
      return sum / total;
    }
  }
  render() {
    const { overall_mean, project, answers, questions } = this.state;
    console.log(overall_mean);
    return (
      <div className="auth-wrapper">
        <Container>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>
                    Feedback statistics for <i> {this.state.project.name}</i>
                  </Card.Title>
                  <Card.Text>
                    Description: {this.state.project.description}
                  </Card.Text>
                  <Card.Text>Location: {this.state.project.location}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>General feedback details </Card.Title>
                  <Card.Text>
                    Completed feedbacks: {answers.length / questions.length}
                  </Card.Text>
                  <Card.Text>
                    Total Participants:{' '}
                    {project.participant_number - project.spots_left}
                  </Card.Text>
                  <Card.Text>
                    Overall score: {this.state.overall_mean}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <ResponsivePie
                data={[
                  {
                    id: 'accepted',
                    label: 'accepted',
                    value: project.accepted,
                    color: 'hsl(127, 70%, 50%)',
                  },
                  {
                    id: 'rejected',
                    label: 'rejected',
                    value: project.refused,
                    color: 'hsl(131, 70%, 50%)',
                  },
                  {
                    id: 'gave up',
                    label: 'gave_up',
                    value: project.gave_up,
                    color: 'hsl(337, 70%, 50%)',
                  },
                ]}
              />
            </Col>
          </Row>{' '}
          {project.food_ensured && (
            <Row>
              <Col>
                <h5 style={{ textAlign: 'center' }}>
                  Food statistics - Average score:{' '}
                  {this.get_mean_by_category('food')}
                </h5>
                <div style={{ height: 300, width: 500 }}>
                  <ResponsiveBar
                    data={this.mapAnswersToStatistics(answers, 'food')}
                  />
                </div>
              </Col>
              <Col>
                <Card style={{ width: 300 }}>
                  <Card.Body>
                    <Card.Title>Questions answered </Card.Title>
                    {questions
                      .filter(
                        question =>
                          question.category === 'food' && question.type === 1
                      )
                      .map(question => (
                        <Card.Text>{question.text}</Card.Text>
                      ))}
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <div style={{ height: '250px', overflowY: 'scroll' }}>
                  <p>
                    <i>Other comments</i>
                  </p>
                  {answers
                    .filter(
                      answer =>
                        answer.question.type === 2 &&
                        answer.question.category === 'food'
                    )
                    .map(ans => (
                      <p>{ans.extra_answer}</p>
                    ))}
                </div>
              </Col>
            </Row>
          )}
          {project.accommodation_ensured && (
            <Row>
              <Col>
                <h5 style={{ textAlign: 'center' }}>
                  Accommodation statistics - Average score:{' '}
                  {this.get_mean_by_category('accommodation')}
                </h5>
                <div style={{ height: 300, width: 500 }}>
                  <ResponsiveBar
                    data={this.mapAnswersToStatistics(answers, 'accommodation')}
                  />
                </div>
              </Col>
              <Col>
                <Card style={{ width: 300 }}>
                  <Card.Body>
                    <Card.Title>Questions answered </Card.Title>
                    {questions
                      .filter(
                        question =>
                          question.category === 'accommodation' &&
                          question.type === 1
                      )
                      .map(question => (
                        <Card.Text>{question.text}</Card.Text>
                      ))}
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <div style={{ height: '250px', overflowY: 'scroll' }}>
                  <p>
                    <i>Other comments</i>
                  </p>
                  {answers
                    .filter(
                      answer =>
                        answer.question.type === 2 &&
                        answer.question.category === 'accommodation'
                    )
                    .map(ans => (
                      <p>{ans.extra_answer}</p>
                    ))}
                </div>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <h5 style={{ textAlign: 'center' }}>
                Organization statistics - Average score:{' '}
                {this.get_mean_by_category('organization')}
              </h5>
              <div style={{ height: 300, width: 500 }}>
                <ResponsiveBar
                  data={this.mapAnswersToStatistics(answers, 'organization')}
                />
              </div>
            </Col>
            <Col>
              <Card style={{ width: 300 }}>
                <Card.Body>
                  <Card.Title>Questions answered </Card.Title>
                  {questions
                    .filter(
                      question =>
                        question.category === 'organization' &&
                        question.type === 1
                    )
                    .map(question => (
                      <Card.Text>{question.text}</Card.Text>
                    ))}
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <div style={{ height: '250px', overflowY: 'scroll' }}>
                <p>
                  <i>Other comments</i>
                </p>
                {answers
                  .filter(
                    answer =>
                      answer.question.type === 2 &&
                      answer.question.category === 'organization'
                  )
                  .map(ans => (
                    <p>{ans.extra_answer}</p>
                  ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 style={{ textAlign: 'center' }}>
                Location statistics - Average score:{' '}
                {this.get_mean_by_category('location')}
              </h5>
              <div style={{ height: 300, width: 500 }}>
                <ResponsiveBar
                  data={this.mapAnswersToStatistics(answers, 'location')}
                />
              </div>
            </Col>
            <Col>
              <Card style={{ width: 300 }}>
                <Card.Body>
                  <Card.Title>Questions answered </Card.Title>
                  {questions
                    .filter(
                      question =>
                        question.category === 'location' && question.type === 1
                    )
                    .map(question => (
                      <Card.Text>{question.text}</Card.Text>
                    ))}
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <div style={{ height: '250px', overflowY: 'scroll' }}>
                <p>
                  <i>Other comments</i>
                </p>
                {answers
                  .filter(
                    answer =>
                      answer.question.type === 2 &&
                      answer.question.category === 'location'
                  )
                  .map(ans => (
                    <p>{ans.extra_answer}</p>
                  ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 style={{ textAlign: 'center' }}>
                Activities statistics - Average score:{' '}
                {this.get_mean_by_category('activities')}
              </h5>
              <div style={{ height: 300, width: 500 }}>
                <ResponsiveBar
                  data={this.mapAnswersToStatistics(answers, 'activities')}
                />
              </div>
            </Col>
            <Col>
              <Card style={{ width: 300 }}>
                <Card.Body>
                  <Card.Title>Questions answered </Card.Title>
                  {questions
                    .filter(
                      question =>
                        question.category === 'activities' &&
                        question.type === 1
                    )
                    .map(question => (
                      <Card.Text>{question.text}</Card.Text>
                    ))}
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <div style={{ height: '250px', overflowY: 'scroll' }}>
                <p>
                  <i>Other comments</i>
                </p>
                {answers
                  .filter(
                    answer =>
                      answer.question.type === 2 &&
                      answer.question.category === 'activities'
                  )
                  .map(ans => (
                    <p>{ans.extra_answer}</p>
                  ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 style={{ textAlign: 'center' }}>
                Overall statistics - Average score:{' '}
                {this.get_mean_by_category('overall')}
              </h5>
              <div style={{ height: 300, width: 500 }}>
                <ResponsiveBar
                  data={this.mapAnswersToStatistics(answers, 'overall')}
                />
              </div>
            </Col>
            <Col>
              <Card style={{ width: 300 }}>
                <Card.Body>
                  <Card.Title>Questions answered </Card.Title>
                  {questions
                    .filter(
                      question =>
                        question.category === 'overall' && question.type === 1
                    )
                    .map(question => (
                      <Card.Text>{question.text}</Card.Text>
                    ))}
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <div style={{ height: '250px', overflowY: 'scroll' }}>
                <p>
                  <i>Other comments</i>
                </p>
                {answers
                  .filter(
                    answer =>
                      answer.question.type === 2 &&
                      answer.question.category === 'overall'
                  )
                  .map(ans => (
                    <p>{ans.extra_answer}</p>
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default withStore(FeedbackStatistics);
