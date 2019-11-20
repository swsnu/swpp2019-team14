import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import './SearchUser.css';
const SearchUser = props => {
  const user = props.user;
  const nickname = user.nickname;
  const username = user.username;
  const text = user.profile_text;
  const date_joined = user.date_joined;
  let profile_photo = '';
  if (user.profile_photo.startsWith('resources/image/profile'))
    profile_photo = '/static/' + user.profile_photo.substr(24);
  else profile_photo = user.profile_photo;

  return (
    <div className="searched_user">
      <Image
        className="user_picture"
        centered={true}
        src={profile_photo}
        ui={false}
        fluid={true}
      />
      <Card className="search_user_card">
        <Card.Content>
          <Card.Header>{nickname}</Card.Header>
          <span className="date">@{username}</span>
          <Card.Meta>
            <span className="date">Joined in {date_joined}</span>
          </Card.Meta>
          <Card.Description>{text}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            22 Followers 24 Followees
          </a>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SearchUser;
