const LocationsTable = ({ locations }) => {
  return (
    <table className="locations-table">
      <thead>
        <tr>
          <th>País</th>
          <th>Estado</th>
          <th>Nome</th>
          <th>Temperatura</th>
          <th>Data/Horário</th>
        </tr>
      </thead>
      <tbody>
        {locations.map(location => (
          <tr key={location.id}>
            <td>{location.country || '-'}</td>
            <td>{location.state || '-'}</td>
            <td>{location.name || '-'}</td>
            <td>{location.temperature}°C</td>
            <td>
              {location.data && location.horario ? (
                `${location.data} ${location.horario}`
              ) : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};