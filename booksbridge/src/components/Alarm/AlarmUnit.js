import React from 'react';

const AlarmUnit = props => {
  if (props.alarm.content == 'follow') {
    const unit = <p></p>;
  }
  return <p>{props.alarm.content}</p>;
};

export default AlarmUnit;
