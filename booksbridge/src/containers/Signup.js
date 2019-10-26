import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";
import "./containers.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormCheck from 'react-bootstrap/FormCheck'

class Signup extends Component {
  state = {
    email: "",
    password: "",
    username: ""
  };

  componentDidMount() { }

  static getDerivedStateFromProps(nextProps, nextState) {
    return nextState;
  }

  onClickSignUpButton = (e) => {
    const user = { "email": this.state.email, "username": this.state.username, "password": this.state.password };
    e.preventDefault();
    this.props.onAddUser(user);
    this.props.history.push('/sign-in');
  };

  render() {
    return (
      <div className="login_page">
        <h1>Sign up</h1>
        <Form className="login_form" onSubmit={this.onClickSignUpButton}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })
              }
            required />
            <Form.Control.Feedback type="invalid">
            Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationFormikUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              aria-describedby="inputGroupPrepend"
              value={this.state.username}
              onChange={event =>
                this.setState({ username: event.target.value })
              }
              required />
            </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            required/>
          </Form.Group>
            <Button
              variant="primary"
              type="submit"
              id="login-button"
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
          onAddUser: (user) => {
          dispatch(actionCreators.postUser(user));
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Signup);
