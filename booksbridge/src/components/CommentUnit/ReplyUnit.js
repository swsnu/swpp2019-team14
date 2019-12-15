import React from 'react';
import { Comment } from 'semantic-ui-react';
import Time from '../Time';

import './ReplyUnit.css';

const ReplyUnit = props => {
  let profile_photo;

  if (props.author.profile_photo.startsWith('http'))
    profile_photo = props.author.profile_photo;
  else profile_photo = '/media/' + props.author.profile_photo;

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
            <Comment.Text>{props.content}</Comment.Text>
          </div>
        </Comment.Content>
      </Comment>
    </div>
  );
};

export default ReplyUnit;
