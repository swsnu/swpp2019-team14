import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './containers.css';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import * as actionCreators from '../store/actions/index';
import axios from 'axios';
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
    axios.get('/api/token/');
  }

  render() {
    return (
      <div className="login_page">
        <img src="/images/MainLogo.png" width="400" />
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form className="login_form" onSubmit={this.onClickSignInButton}>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Username"
                  id="username-input"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={event =>
                    this.setState({ username: event.target.value })
                  }
                  required
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  type="password"
                  id="pw-input"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                  required
                />

                <Button
                  id="login-button"
                  type="submit"
                  content="Login"
                  primary
                />
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <Button
                content="Sign up"
                icon="signup"
                size="big"
                id="signup-button"
                onClick={() => this.props.history.push('/sign-up/')}
              />
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: user => {
      dispatch(actionCreators.loginUser(user));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Signin));
