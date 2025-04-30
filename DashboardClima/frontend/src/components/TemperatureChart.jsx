import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const TemperatureChart = ({ location }) => {
  const baseTemp = location?.temperature || 24;

  const data = [
    { period: 'Manhã', temperature: baseTemp - 4 },
    { period: 'Tarde', temperature: baseTemp },
    { period: 'Noite', temperature: baseTemp - 2 },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
