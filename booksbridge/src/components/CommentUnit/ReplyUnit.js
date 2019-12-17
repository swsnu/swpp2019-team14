import React, { useState } from 'react';
import { Comment, Icon, Form, Button } from 'semantic-ui-react';
import Time from '../Time';

import './ReplyUnit.css';

const ReplyUnit = props => {
  const [onEdit, showEditForm] = useState(false);
  const [editcontent, handleInput] = useState('');
  let profile_photo;

  if (props.author.profile_photo.startsWith('http'))
    profile_photo = props.author.profile_photo;
  else profile_photo = '/media/' + props.author.profile_photo;

  const EditDeleteButton =
    props.author.username === props.logged_in_user.username ? (
      <div className="CommentDeleteButton">
        <Icon
          name="pencil"
          id="edit-reply-icon"
          onClick={() => {
            showEditForm(!onEdit);
            handleInput(props.content);
          }}
        />
        <Icon
          name="delete"
          id="reply-delete-icon"
          onClick={() => props.DeleteHandler(props.id)}
        />
      </div>
    ) : null;

  const onClickEditComment = () => {
    if (editcontent != '') {
      if (props.is_article) {
        const comment = {
          id: props.id,
          content: editcontent,
        };
        props.EditCommentHandler(comment);
        showEditForm(false);
      } else {
        const comment = {
          id: props.id,
          content: editcontent,
        };
        props.EditCurationCommentHandler(comment);
        showEditForm(false);
      }
    } else {
      window.alert('Content is empty.');
    }
  };

  const editForm = (
    <Form reply>
      <Form.TextArea
        id="edit-input"
        className="ReplyTextArea"
        value={editcontent}
        onChange={e => handleInput(e.target.value)}
      />
      <div className="ReplyButton">
        <Button
          className="ReplyButton"
          id="edit-reply-button"
          content="답글 수정"
          labelPosition="right"
          icon="edit"
          onClick={() => onClickEditComment()}
          secondary
        />
      </div>
    </Form>
  );

  return (
    <div className="ReplyUnit">
      <Comment>
        <a id="redirect-to-userpage" href={'/page/' + props.author.username}>
          <Comment.Avatar src={profile_photo} />
        </a>
        <Comment.Content>
          <div className="CommentContents">
            <a
              id="redirect-to-userpage"
              href={'/page/' + props.author.username}
            >
              <Comment.Author as="a">{props.author.nickname}</Comment.Author>
            </a>
            <Comment.Metadata>
              <div>
                <Time date={props.date} />
              </div>
            </Comment.Metadata>
            <div className="CommentButton">{EditDeleteButton}</div>
            <Comment.Text>{props.content}</Comment.Text>
          </div>
          {onEdit == true ? editForm : null}
        </Comment.Content>
      </Comment>
    </div>
  );
};

export default ReplyUnit;
