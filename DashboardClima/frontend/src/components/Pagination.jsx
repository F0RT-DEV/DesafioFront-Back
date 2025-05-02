import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({ 
  currentPage = 1, 
  setCurrentPage, 
  pageSize = 10, 
  setPageSize,
  totalItems = 0
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // voltar para a primeira página ao mudar o tamanho
  };

  return (
    <div className="pagination">
      <div className="pagination-size">
        <select 
          className="pagination-select" 
          value={pageSize} 
          onChange={handlePageSizeChange}
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>
      </div>

      <div className="pagination-controls">
        <button 
          className="pagination-button"
          onClick={handlePrevious}
          disabled={currentPage <= 1}
        >
          <ChevronLeft size={16} />
          Anterior
        </button>
        
        <span className="pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        
        <button 
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
        >
          Próxima
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;