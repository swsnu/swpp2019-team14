import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Popup, Button, Form, TextArea, Confirm } from 'semantic-ui-react';

import Header from '../../components/Header';
import * as actionCreators from '../../store/actions/actionCreators';

import './CreatePost.css';

class CreatePost extends Component {
  constructor(params) {
    super(params);
    this.state = {
      content: '',
      // title:'',
      confirm: false,
    };
  }

  async onClickCreateButton() {
    await this.props.onPostPost({
      // title: this.state.title,
      content: this.state.content,
    });
    console.log(this.props.currentPost);
    this.props.onCreate(this.props.currentPost);
  }

  confirm_open = () => {
    // if (this.state.title === '') window.alert('제목을 반드시 입력해야 합니다.');
    if (this.state.content === '')
      window.alert('내용을 반드시 작성해야 합니다.');
    else this.setState({ ...this.state, confirm: true });
  };
  confirm_close = () => {
    this.setState({ ...this.state, confirm: false });
    this.props.onClose();
  };

  render() {
    return (
      <div className="CreatePost">
        <div className="PostCreateForm">
          <Form className="ui form">
            {/* <div className="field">
                <label className="FormLabel">포스트 제목</label>
                <input
                  id="post-title"
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  onChange={event =>
                    this.setState({ title: event.target.value })
                  }
                />
              </div> */}
            <br />
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
              className="SubmitButton"
              id="create-post"
              content="Submit"
              onClick={this.confirm_open}
            />
            <Confirm
              className="CreatePostConfirm"
              open={this.state.confirm}
              onCancel={this.confirm_close}
              onConfirm={() => this.onClickCreateButton()}
              size={'large'}
              cancelButton="취소"
              confirmButton="작성"
              content="이대로 포스트를 올리시겠습니까?"
            />
            <Button
              className="CloseButton"
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
    onPostPost: post => dispatch(actionCreators.postPost(post)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CreatePost));
