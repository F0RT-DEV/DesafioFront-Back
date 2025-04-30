import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { period: 'Manhã', temperature: 20 },
  { period: 'Tarde', temperature: 28 },
  { period: 'Noite', temperature: 22 },
];
const TemperatureChart = () => {
  // const [animated, setAnimated] = useState(false);
  
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setAnimated(true);
  //   }, 300);
    
  //   return () => clearTimeout(timer);
  // }, []);
  
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