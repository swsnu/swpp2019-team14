import React from 'react';
import './Alarm.css';
const Alarm = props => {
  return (
    <div className={props.alarm.is_new ? 'new-alarm' : 'old-alarm'}>
      <a
        id="click-alarm"
        href={props.alarm.link}
        onClick={() => props.onClickAlarm(props.alarm.id)}
      >
        <a
          className="profilePic-link"
          href={'/page/' + props.alarm.author_username}
        >
          <img
            className="AlarmProfilePic"
            src={
              props.alarm.profile_photo.startsWith('http')
                ? props.alarm.profile_photo
                : '/media/' + props.alarm.profile_photo
            }
          />
        </a>
        {props.alarm.content}
      </a>
    </div>
  );
};

export default Alarm;
