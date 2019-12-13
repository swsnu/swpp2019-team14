import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Form, TextArea } from 'semantic-ui-react';

import * as actionCreators from '../../store/actions/actionCreators';

import './CreatePost.css';

class CreatePost extends Component {
  constructor(params) {
    super(params);
    this.state = {
      content: '',
    };
  }

  async onClickCreateButton() {
    if (this.state.content === '') {
      window.alert('내용을 반드시 작성해야 합니다.');
    } else {
      await this.props.onPostPost(1, {
        content: this.state.content,
      });
      this.props.onCreate();
    }
  }

  render() {
    return (
      <div className="CreatePost">
        <div className="PostCreateForm">
          <Form className="ui form">
            <div className="field">
              <label className="FormLabel">포스트 내용</label>
              <TextArea
                id="post-content"
                name="content"
                placeholder="Enter Content"
                rows={'10'}
                onChange={event =>
                  this.setState({ content: event.target.value })
                }
              />
            </div>

            <Button
              id="create-post-button"
              content="Submit"
              onClick={() => this.onClickCreateButton()}
            />
            <Button
              id="close-create-post-button"
              onClick={this.props.onClose}
              content="Close"
            />
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentPost: state.post.selectedPost,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostPost: (page, post) => dispatch(actionCreators.postPost(page, post)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CreatePost));
