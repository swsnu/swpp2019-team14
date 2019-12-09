import React from 'react';

const AlarmUnit = props => {
  const unit = (
    <a href={props.alarm.link}>
      <a href={'/page/' + props.alarm.author_username}>
        <img className="profilePic" src={props.alarm.profile_photo} />
      </a>
      {props.alarm.content}
    </a>
  );
  return <div>{unit}</div>;
};

export default AlarmUnit;
