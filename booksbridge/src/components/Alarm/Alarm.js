import React from 'react';
import AlarmUnit from './AlarmUnit';

const Alarm = props => {
  const alarms = props.alarms.map(alarm => <AlarmUnit alarm={alarm} />);
  return <div>{alarms}</div>;
};

export default Alarm;
