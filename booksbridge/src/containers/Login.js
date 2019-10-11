import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './containers.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  componentDidMount() {
    // this.props.onGetUsers();
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    // if (nextProps.storedUser !== null && nextProps.loggedinUser !== null) {
    //   nextProps.history.push('/');
    // }
    return nextState;
  }

  LoginHandler = () => {
    // if (this.state.email === this.props.storedUser.email && this.state.password === this.props.storedUser.password) {
    //   this.props.onToggleLoginInfo(this.props.storedUser);
    // }
    // else {
    //   alert("Email or password is wrong");
    // }
    this.props.history.push('/main/');
  }

  render() {
    return (
      <div className='login_page'>
        <h1>Login</h1>
        <Form className="login_form">
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              id="email-input"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="pw-input"
              value={this.state.password}
              onChange={(event) => this.setState({ password: event.target.value })} />
          </Form.Group>
          <Button
            variant="primary"
            id="login-button"
            onClick={() => this.LoginHandler()}>Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));