import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import './containers.css';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import Header from '../components/Header'

class Create extends Component {
  state = {
    title: '',
    content: '',
    write: true,
  }

  componentDidMount() {
    // if (this.props.loggedinUser === null) {
    //   this.props.history.push('/login/');
    // }
  }

  AddArticleHandler = () => {
    // this.props.onAddArticle(this.state.title, this.state.content, this.props.loggedinUser.id);
  }
  BackHandler = () => {
    // this.props.history.push('/articles/');
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.write ?
          (<Form >
            <Form.Group>
              <Form.Control
                type="text"
                value={this.state.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control as="textarea"
                rows="18"
                type="text"
                value={this.state.content}
              />
            </Form.Group>
          </Form>) :
          <Alert variant="light" className="preview-tab" >
            <Alert.Heading>
              <h3 >{this.props.loggedinUser.name}</h3>
              <h2 >{this.state.title}</h2>
            </Alert.Heading>
            <p >{this.state.content}</p>
          </Alert>
        }
        <div>
          <Button
            onClick={() => this.BackHandler()}
          >Back</Button>
          <Button
            disabled={!this.state.title || !this.state.content}
          >Confirm</Button>
          <Button
          >Preview tab</Button>
          <Button
          >Write tab</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onAddArticle: (title, content, user_id) =>
    //   dispatch(actionCreators.addArticle({ title: title, content: content, author_id: user_id })),
    // onToggleLoginInfo: (user) =>
    //   dispatch(actionCreators.toggleLoginInfo(user)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);