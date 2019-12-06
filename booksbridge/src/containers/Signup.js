import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './containers.css';
import { Button } from 'semantic-ui-react';
import Form from 'react-bootstrap/Form';
import * as actionCreators from '../store/actions/index';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    nickname: '',
  };

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps, nextState) {
    return nextState;
  }

  onClickSignUpButton = e => {
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      nickname: this.state.nickname,
    };
    e.preventDefault();
    this.props.onAddUser(user);
  };

  render() {
    return (
      <div className="signup_page">
        <Form className="login_form" onSubmit={this.onClickSignUpButton}>
          <p className="SignUpLabel">회원가입</p>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="SignUpSmallLabel">이메일 주소</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
              required
            />
            <Form.Control.Feedback type="invalid">
              올바른 이메일 주소가 아닙니다.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationFormUsername">
            <Form.Label className="SignUpSmallLabel">아이디</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              aria-describedby="inputGroupPrepend"
              value={this.state.username}
              onChange={event =>
                this.setState({ username: event.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicNickname">
            <Form.Label className="SignUpSmallLabel">닉네임</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter nickname"
              value={this.state.nickname}
              onChange={event =>
                this.setState({ nickname: event.target.value })
              }
              required
            />
            <Form.Text className="text-muted">
              닉네임은 8글자를 넘을 수 없으며, 공백이 들어갈 수 없습니다.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="SignUpSmallLabel">비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              required
            />
          </Form.Group>
          <div className="SignUpFooter">
            <Button variant="primary" type="submit" id="login-button">
              회원가입
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onAddUser: user => {
      dispatch(actionCreators.postUser(user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
