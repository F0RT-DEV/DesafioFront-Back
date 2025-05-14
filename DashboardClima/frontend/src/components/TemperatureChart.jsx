import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const TemperatureChart = ({ locationData }) => {
  const baseTemp = locationData?.temperature || 24;
  const [period, setPeriod] = useState('dia');

  const getDataByPeriod = () => {
    switch (period) {
      case 'manha-tarde':
        return [
          { period: 'Manhã', temperature: baseTemp - 4 },
          { period: 'Tarde', temperature: baseTemp },
        ];
      case 'tarde-noite':
        return [
          { period: 'Tarde', temperature: baseTemp },
          { period: 'Noite', temperature: baseTemp - 2 },
        ];
      case 'dia':
      default:
        return [
          { period: 'Manhã', temperature: baseTemp - 4 },
          { period: 'Tarde', temperature: baseTemp },
          { period: 'Noite', temperature: baseTemp - 2 },
        ];
    }
  };

  const data = getDataByPeriod();

  return (
    <div style={{
      width: '96%',
      height: 380,
      backgroundColor: '#1e1e2f',
      borderRadius: '16px',
      padding: '20px',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Variação de Temperatura</h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{
            backgroundColor: '#2f2f45',
            color: '#fff',
            border: '1px solid #555',
            borderRadius: '6px',
            padding: '6px 10px'
          }}
        >
          <option value="dia">Dia inteiro</option>
          <option value="manha-tarde">Manhã e Tarde</option>
          <option value="tarde-noite">Tarde e Noite</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 30 }}>
          <defs>
            <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00bfff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#004466" stopOpacity={0.4} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#333" strokeDasharray="3 3" />

          <XAxis
            dataKey="period"
            stroke="#ccc"
            tick={{
              fill: '#eee',
              fontSize: 14,
              textAnchor: 'middle'
            }}
          />

          <YAxis
            stroke="#ccc"
            unit="°C"
            domain={[-40, 60]}
            ticks={[-40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60]}
          />

          <Tooltip
            contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#ccc' }}
            formatter={(value) => `${value}°C`}
          />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="url(#lineColor)"
            strokeWidth={3}
            dot={{ r: 5, fill: '#fff', stroke: '#00bfff', strokeWidth: 2 }}
            activeDot={{ r: 7, fill: '#00bfff' }}
            isAnimationActive
            animationDuration={700}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;

