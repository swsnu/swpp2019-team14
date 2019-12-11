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

  if (user.profile_photo.startsWith('http')) profile_photo = user.profile_photo;
  else profile_photo = '/media/' + user.profile_photo;

  return (
    <a className="searched_user" href={'/page/' + username}>
      <Image
        className="user_picture"
        centered={true}
        src={profile_photo}
        ui={false}
        fluid={true}
      />
      <Card className="search_user_card">
        <Card.Content>
          <Card.Header>
            <a>{nickname}</a>
          </Card.Header>
          <a className="date">@{username}</a>
          <Card.Meta>
            <span className="date">Joined in {date_joined}</span>
          </Card.Meta>
          <Card.Description className="card-description">
            {text}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
          </a>
        </Card.Content>
      </Card>
    </a>
  );
};

export default SearchUser;
