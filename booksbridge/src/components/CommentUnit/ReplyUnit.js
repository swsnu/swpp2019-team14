import React from 'react';
import { Comment } from 'semantic-ui-react';
import Time from '../Time';

import './ReplyUnit.css';

const ReplyUnit = props => {
  let profile_photo;

  if (props.author.profile_photo.startsWith('http'))
    profile_photo = props.author.profile_photo;
  else profile_photo = '/media/' + props.author.profile_photo;

  window.alert('Title or content is empty.');
  return (
    <div className="ReplyUnit">
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
    </div>
  );
};

export default ReplyUnit;
