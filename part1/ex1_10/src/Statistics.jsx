import React from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  if (all == 0){
    return (
      <div>
        <h1>Statistics</h1>
        <div>No feedback given</div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <div>good: {good}</div>
        <div>neutral: {neutral}</div>
        <div>bad: {bad}</div>
        <div>all: {all}</div>
        <div>average: {average}</div>
        <div>positive: {positive}%</div>
      </div>
    );
  }

};

export default Statistics;
