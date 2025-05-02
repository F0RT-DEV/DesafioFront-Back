import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecordsTable from '../components/RecordsTable';
import EditRecordModal from '../components/EditRecordModal';
import './Records.css';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3000/registros');
        
        const formattedRecords = response.data.map(record => ({
          id: record.id_temperatura.toString(),
          locationName: record.local,
          state: record.estado, // Adicione esta linha
          country: record.pais,
          date: record.data,
          time: record.horario,
          temperature: record.temperatura
        }));
        
        setRecords(formattedRecords);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar registros:', error);
        setIsLoading(false);
      }
    };
  
    fetchRecords();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate]);

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    
    if (dateStr.includes('-')) {
      return new Date(dateStr);
    }
    
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredRecords = records.filter(record => {
    if (!startDate && !endDate) return true;

    const recordDate = parseDate(record.date);
    const fromDate = startDate ? parseDate(startDate) : null;
    const toDate = endDate ? parseDate(endDate) : null;

    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }

    if (fromDate && recordDate < fromDate) return false;
    if (toDate && recordDate > toDate) return false;

    return true;
  });

  const totalItems = filteredRecords.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + pageSize);

  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  // const formatDateToISO = (dateStr) => {
  //   const [day, month, year] = dateStr.split('/');
  //   return `${year}-${month}-${day}`;
  // };
  const handleSaveRecord = async (updatedRecord) => {
    try {
      // Inclua todos os campos necessários no objeto enviado
      const recordToUpdate = {
        ...updatedRecord,
        local: updatedRecord.locationName,
        estado: updatedRecord.state, // Adicione esta linha
        pais: updatedRecord.country,
        data: updatedRecord.date,
        horario: updatedRecord.time,
        temperatura: updatedRecord.temperature
      };
  
      await axios.put(`http://localhost:3000/registros/${updatedRecord.id}`, recordToUpdate);
      
      setRecords(prev =>
        prev.map(rec => (rec.id === updatedRecord.id ? updatedRecord : rec))
      );
      
      alert('Registro atualizado com sucesso!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      alert('Erro ao atualizar o registro.');
    }
  };

  const handleDeleteRecord = async (id) => {
    const confirmed = window.confirm("Tem certeza que deseja remover este registro?");
    if (!confirmed) return;
  
    try {
      // Envie o id_Local em vez do id_temperatura
      const response = await axios.delete(`http://localhost:3000/registros/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) {
        setRecords(prev => prev.filter(record => record.id !== id));
        alert('Registro excluído com sucesso!');
      } else {
        alert(response.data.mensagem || 'Erro ao excluir registro');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.mensagem || 
                      error.message || 
                      'Erro ao conectar com o servidor';
      console.error('Erro na exclusão:', errorMsg);
      alert(errorMsg);
    }
  };

  if (isLoading) {
    return <div className="loading">Carregando registros...</div>;
  }

  return (
    <div className="app-container">
      <div className="page-container">
        <h1>Histórico de Registros de Temperatura</h1>
        <RecordsTable
          records={paginatedRecords}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItems={totalItems}
          onEditRecord={handleEditRecord}
          onDeleteRecord={handleDeleteRecord}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        {isModalOpen && (
          <EditRecordModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            record={selectedRecord}
            onSave={handleSaveRecord}
          />
        )}
      </div>
    </div>
  );
};

export default Records;