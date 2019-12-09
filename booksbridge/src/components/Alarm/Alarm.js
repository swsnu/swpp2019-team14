import React from 'react';
import './Alarm.css';
const Alarm = props => {
  const alarms = props.alarms.map(alarm => (
    <div className={alarm.is_new ? 'new-alarm' : 'old-alarm'}>
      <a
        href={alarm.link}
        onClick={alarm.is_new ? props.onClickAlarm(alarm.id) : null}
      >
        <a href={'/page/' + alarm.author_username}>
          <img className="profilePic" src={alarm.profile_photo} />
        </a>
        {alarm.content}
      </a>
    </div>
  ));
  return <div>{alarms}</div>;
};

export default Alarm;
