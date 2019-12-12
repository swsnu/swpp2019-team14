import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Popup, Button, Form, TextArea, Confirm } from 'semantic-ui-react';

import Header from '../../components/Header';
import * as actionCreators from '../../store/actions/actionCreators';

import './CreatePost.css';

class CreatePost extends Component {
  state = {
    title: '',
    content: '',
    confirm: false,
  };

  onClickCreateButton = () => {
    this.props.onPostPost({
      title: this.state.title,
      content: this.state.content,
    });
  };

  confirm_open = () => {
    if (this.state.title === '') window.alert('제목을 반드시 입력해야 합니다.');
    else if (this.state.content === '')
      window.alert('내용을 반드시 작성해야 합니다.');
    else this.setState({ ...this.state, confirm: true });
  };
  confirm_close = () => this.setState({ ...this.state, confirm: false });

  render() {
    return (
      <div className="CreatePost">
        <Header />

        <div>
          <div className="PostCreateForm">
            <Form className="ui form">
              <div className="field">
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
              </div>
              <br />
              <div className="field">
                <label className="FormLabel">포스트 내용</label>
                <TextArea
                  id="post-content"
                  name="content"
                  placeholder="Enter Content"
                  rows={'20'}
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
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostPost: post => dispatch(actionCreators.postPost(post)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(CreatePost));
