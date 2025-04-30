import React, { useState } from 'react';
import Pagination from './Pagination';
import { Clock, Edit2, Trash2, ThermometerIcon } from 'lucide-react';
import './RecordsTable.css';

const RecordsTable = ({ 
  records, 
  currentPage, 
  setCurrentPage, 
  pageSize, 
  setPageSize,
  onEditRecord,
  onDeleteRecord // <- Adicionado aqui
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredRecords = records.filter(record => {
    if (!startDate && !endDate) return true;

    const recordDate = parseDate(record.date);
    const fromDate = startDate ? new Date(startDate) : null;
    const toDate = endDate ? new Date(endDate) : null;

    if (fromDate && recordDate < fromDate) return false;
    if (toDate && recordDate > toDate) return false;

    return true;
  });

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">
          <ThermometerIcon className="title-icon" size={20} />
          Histórico de Registros
        </h2>
      </div>

      <div className="filter-container">
        <label>
          De:
          <input 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)} 
          />
        </label>
        <label>
          Até:
          <input 
            type="date" 
            value={endDate} 
            onChange={e => setEndDate(e.target.value)} 
          />
        </label>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Local</th>
              <th>Data e Hora</th>
              <th>Temperatura</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(record => (
              <tr key={record.id}>
                <td className="location-name">{record.locationName}</td>
                <td className="datetime">
                  <Clock size={14} className="datetime-icon" />
                  {record.date} {record.time}
                </td>
                <td>
                  <span className={`temp-badge ${
                    record.temperature > 25 ? 'high' : 
                    record.temperature < 15 ? 'low' : 
                    'normal'
                  }`}>
                    {record.temperature}°C
                  </span>
                </td>
                <td className="actions">
                  <button 
                    className="btn-icon" 
                    title="Editar"
                    onClick={() => onEditRecord(record)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    className="btn-icon btn-danger" 
                    title="Remover"
                    onClick={() => onDeleteRecord(record.id)} // <- Remoção funcional
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={filteredRecords.length}
      />
    </div>
  );
};

export default RecordsTable;

