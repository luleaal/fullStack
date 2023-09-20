import React from 'react';
import StatisticLine from './StatisticsLine';

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
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <tr>
            <td>all:</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average:</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive:</td>
            <td>{positive} %</td>
          </tr>
        </table>
      </div>
    );
  }

};

export default Statistics;
