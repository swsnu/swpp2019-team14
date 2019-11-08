import { withRouter } from 'react-router-dom';
import React from 'react';
import { Comment } from 'semantic-ui-react';

import './ReplyUnit.css';

const ReplyUnit = props => {
  let profile_photo;

  const timeDiff = () => {
    const pTime = props.date;
    if (pTime[0]) return pTime[0] + ' years ago';
    else if (pTime[1]) return pTime[1] + ' months ago';
    else if (pTime[2]) return pTime[2] + ' days ago';
    else if (pTime[3]) return pTime[3] + ' hours ago';
    else if (pTime[4]) return pTime[4] + ' minutes ago';
    else return '방금 전';
  };

  if (props.author.profile_photo.startsWith('resources/image/profile'))
    profile_photo = '/static/' + props.author.profile_photo.substr(24);
  else profile_photo = props.author.profile_photo;

  return (
    <Comment>
      <Comment.Avatar src={profile_photo} />
      <Comment.Content>
        <Comment.Author as="a">{props.author.nickname}</Comment.Author>
        <Comment.Metadata>
          <div>{timeDiff()}</div>
        </Comment.Metadata>
        <Comment.Text>{props.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default withRouter(ReplyUnit);
