import React, { useState, useEffect } from 'react';
import RecordsTable from '../components/RecordsTable';
import EditRecordModal from '../components/EditRecordModal';
import './Records.css';

const sampleRecords = [
  { id: 1, locationName: "São Paulo", date: "2025-04-25", time: "10:30", temperature: 24 },
  { id: 2, locationName: "Rio de Janeiro", date: "2025-04-25", time: "09:45", temperature: 28 },
  { id: 3, locationName: "Belo Horizonte", date: "2025-04-25", time: "11:15", temperature: 22 },
  { id: 4, locationName: "Curitiba", date: "2025-04-25", time: "08:30", temperature: 17 },
  { id: 5, locationName: "Porto Alegre", date: "2025-04-25", time: "09:00", temperature: 19 },
  { id: 6, locationName: "Brasília", date: "2025-04-25", time: "10:15", temperature: 26 },
  { id: 7, locationName: "Salvador", date: "2025-04-25", time: "09:30", temperature: 29 },
  { id: 8, locationName: "Fortaleza", date: "2025-04-25", time: "08:45", temperature: 30 },
];

const Records = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // Simulate API call
    setRecords(sampleRecords);
  }, []);

  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleSaveRecord = () => {
    // Save logic would go here
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <div className="page-container">
        <h1>Histórico de Registros de Temperatura</h1>
        
        <RecordsTable
          records={records}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
        
        <EditRecordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          record={selectedRecord}
          onSave={handleSaveRecord}
        />
      </div>
    </div>
  );
};

export default Records;