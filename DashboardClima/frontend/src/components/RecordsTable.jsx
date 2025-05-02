import React from 'react';
import Pagination from './Pagination';
import { Clock, Edit2, Trash2, Thermometer, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './RecordsTable.css';

const RecordsTable = ({ 
  records, 
  currentPage, 
  setCurrentPage, 
  pageSize, 
  setPageSize,
  totalItems,
  onEditRecord,
  onDeleteRecord,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) => {
  const navigate = useNavigate();

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">
          <Thermometer className="title-icon" size={20} />
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
            onChange={e => {
              if (startDate && e.target.value < startDate) {
                alert('A data final não pode ser anterior à data inicial');
                return;
              }
              setEndDate(e.target.value);
            }} 
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
              <th>País</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                <td className="location-name">{record.locationName}</td>
                <td className="datetime">
                  <Clock size={14} className="datetime-icon" />
                  {record.date} {record.time}
                </td>
                <td>
                  <span className={`temp-badge ${
                    record.temperature > 25 ? 'high' : 
                    record.temperature < 20 ? 'low' : 
                    'normal'}`}>
                    {record.temperature}°C
                  </span>
                </td>
                <td className="country-name">{record.country}</td>
                <td className="actions">
                  <button 
                    className="btn-icon" 
                    title="Detalhes"
                    onClick={() => navigate(`/registro/${record.id}`, { state: { selectedLocation: record } })}
                  >
                    <Eye size={16} />
                  </button>
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
                    onClick={() => onDeleteRecord(record.id)} 
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
        totalItems={totalItems}
      />
    </div>
  );
};

export default RecordsTable;