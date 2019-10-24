import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";
import "./containers.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Signup extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps, nextState) {
    return nextState;
  }

  onClickSignUpButton = () => {
    this.props.onAddUser(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className="login_page">
        <h1>Sign up</h1>
        <Form className="login_form">
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              id="email-input"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="pw-input"
              value={this.state.password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </Form.Group>
          <Button
            variant="primary"
            id="login-button"
            onClick={() => this.onClickSignUpButton()}
          >
            Confirm
          </Button>
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
    onAddUser: (email, password) => {
      //dispatch(actionCreators.postUser({email, password}));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
