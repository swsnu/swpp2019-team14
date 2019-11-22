import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './containers.css';
import { Button } from 'semantic-ui-react';
import Form from 'react-bootstrap/Form';
import * as actionCreators from '../store/actions/index';
import './containers.css';
class Signin extends Component {
  state = {
    username: '',
    password: '',
  };

  onClickSignInButton = e => {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    e.preventDefault();
    this.props.onLoginUser(user);
  };

  componentDidMount() {
    on;
  }

  render() {
    return (
      <div className="login_page">
        <Form className="login_form" onSubmit={this.onClickSignInButton}>
          <h1>SIGN IN</h1>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              id="username-input"
              placeholder="Enter username"
              value={this.state.username}
              onChange={event =>
                this.setState({ username: event.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="pw-input"
              placeholder="Enter password"
              value={this.state.password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              required
            />
          </Form.Group>
          <Button variant="primary" id="login-button" type="submit">
            Sign in
          </Button>
          <Button
            variant="primary"
            id="signup-button"
            onClick={() => this.props.history.push('/sign-up/')}
          >
            Sign up
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: user => {
      dispatch(actionCreators.loginUser(user));
    },
    onGetToken: () => {
      dispatch(actionCreators.getToken());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Signin));
