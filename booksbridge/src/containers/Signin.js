import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './containers.css';
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Radio,
  Popup,
} from 'semantic-ui-react';
import * as actionCreators from '../store/actions/index';
import axios from 'axios';
import './containers.css';
class Signin extends Component {
  state = {
    username: '',
    password: '',
    autoLogin: false,
  };

  onClickSignInButton = e => {
    const user = {
      username: this.state.username,
      password: this.state.password,
      auto_login: this.state.autoLogin,
    };
    e.preventDefault();
    this.props.onLoginUser(user);
  };

  onToggleAutoLogin = () => {
    this.setState({
      ...this.state,
      autoLogin: !this.state.autoLogin,
    });
  };

  componentDidMount() {
    axios.get('/api/token/').then(res => {
      if (res.status === 200) this.props.history.push('/main');
    });
  }

  render() {
    const autoLoginRadio = (
      <Radio
        toggle
        label="Sign-in automatically"
        onChange={() => this.onToggleAutoLogin()}
      />
    );

    return (
      <div className="login_page">
        <img id="MainLogo" src="/images/MainLogo.png" />
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

                <Form.Input>
                  <Popup
                    trigger={autoLoginRadio}
                    content="자동 로그인 기능을 사용함으로써, 사용자의 로그인 정보를 사용자의 컴퓨터에 저장하는 우리의 쿠키 정책에 동의하게 됩니다. 공공장소에서는 자동 로그인 기능을 사용하지 마십시오."
                    position="top center"
                  />
                </Form.Input>

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
