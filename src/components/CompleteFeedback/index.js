import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Modal, Jumbotron, Form } from 'react-bootstrap';
import './styles.css';
import { withStore } from '../helpers';

class CompleteFeedback extends Component {
  state = {
    questions: [],
    answers: {},
    error: false,
  };
  async componentDidMount() {
    const { store } = this.props;
    const questions = await store.projectStore.getQuestions();
    console.log(questions);
    questions.forEach(element => {
      this.setState({
        answers: {
          ...this.state.answers,
          [element.id]: element.type === 1 ? 5 : '',
        },
      });
    });
    this.setState({ questions });
  }
  handleChange(event) {
    const {
      target: { value, name },
    } = event;

    return this.setState({
      answers: {
        ...this.state.answers,
        [name]: value,
      },
    });
  }

  async handleSubmitForm(event) {
    try {
      event.preventDefault();
      const { store } = this.props;

      await store.projectStore.sendFeedback(this.state.answers);

      window.location.reload();
    } catch (error) {
      document.getElementById('feedback-form').reset();
      this.setState({ error: true });

      setTimeout(() => this.setState({ error: false }), 2000);
    }
  }
  render() {
    const { questions, answers, error } = this.state;
    console.log(this.state);
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          {questions && questions.length === 0 ? (
            <Jumbotron>
              <p>
                Congratulations! You completed all the feedback you had to.
                We're so proud of you!
              </p>
            </Jumbotron>
          ) : (
            <Form
              onSubmit={event => this.handleSubmitForm(event)}
              id="feedback-form"
            >
              <h3>Feedback form</h3>
              <p>
                {' '}
                <i>
                  Please keep in mind that all answers are answered anonymous.
                  The feedback is very important to us so we can learn how to
                  fit your needs better! Be as sincere as you can. There is no
                  right/wrong answer A score of 1 means you hated the rated
                  topic and a score of 10 means that it was perfect.
                </i>
              </p>
              {questions.map(question =>
                question.type === 1 ? (
                  <Form.Group key={question.id} controlId="formBasicRange">
                    <Form.Label>{question.text}</Form.Label>
                    <Form.Control
                      name={question.id}
                      value={answers[question.id] || 5}
                      onChange={event => this.handleChange(event)}
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      required
                    />
                    <output>Your response: {answers[question.id] || 5}</output>
                  </Form.Group>
                ) : (
                  <Form.Group
                    key={question.id}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>{question.text}</Form.Label>
                    <Form.Control
                      type="text"
                      value={answers[question.id] || ''}
                      name={question.id}
                      placeholder="Enter your answer here..."
                      onChange={event => this.handleChange(event)}
                      required
                    />
                  </Form.Group>
                )
              )}
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </Form>
          )}
        </div>
      </div>
    );
  }
}

export default withStore(CompleteFeedback);
