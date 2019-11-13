import React from 'react';

const Time = props => {
  const timeDiff = () => {
    const pTime = props.date;
    if (pTime[0]) return pTime[0] + ' years ago';
    else if (pTime[1]) return pTime[1] + ' months ago';
    else if (pTime[2]) return pTime[2] + ' days ago';
    else if (pTime[3]) return pTime[3] + ' hours ago';
    else if (pTime[4]) return pTime[4] + ' minutes ago';
    else return '방금 전';
  };
  return <span className="date">{timeDiff()}</span>;
};

export default Time;
