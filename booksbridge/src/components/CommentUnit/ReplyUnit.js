import { withRouter } from 'react-router-dom';
import React from 'react';
import { Comment } from 'semantic-ui-react';
import Time from '../Time';

import './ReplyUnit.css';

const ReplyUnit = props => {
  let profile_photo;

  if (props.author.profile_photo.startsWith('resources/image/profile'))
    profile_photo = '/static/' + props.author.profile_photo.substr(24);
  else profile_photo = props.author.profile_photo;

  return (
    <Comment>
      <Comment.Avatar src={profile_photo} />
      <Comment.Content>
        <Comment.Author as="a">{props.author.nickname}</Comment.Author>
        <Comment.Metadata>
          <div>
            <Time date={props.date} />
          </div>
        </Comment.Metadata>
        <Comment.Text>{props.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default withRouter(ReplyUnit);
