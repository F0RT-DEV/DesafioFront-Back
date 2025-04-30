import React from 'react';
import './LocationsTable.css';

const LocationsTable = ({ locations }) => {
  return (
    <table className="locations-table">
      <thead>
        <tr>
          <th>Estado</th>
          <th>Nome</th>
          <th>Temperatura</th>
        </tr>
      </thead>
      <tbody>
        {locations.map(location => (
          <tr key={location.id}>
            <td>{location.state}</td>
            <td>{location.name}</td>
            <td>{location.temperature}°C</td>
            <td>{location.date}°C</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LocationsTable;