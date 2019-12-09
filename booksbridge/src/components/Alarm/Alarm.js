import React from 'react';
import './Alarm.css';
const Alarm = props => {
  return (
    <div className={props.alarm.is_new ? 'new-alarm' : 'old-alarm'}>
      <a
        href={props.alarm.link}
        onClick={() => props.onClickAlarm(props.alarm.id)}
      >
        <a href={'/page/' + props.alarm.author_username}>
          <img className="profilePic" src={props.alarm.profile_photo} />
        </a>
        {props.alarm.content}
      </a>
    </div>
  );
};

export default Alarm;
