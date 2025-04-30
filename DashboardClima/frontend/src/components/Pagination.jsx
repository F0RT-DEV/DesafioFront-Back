import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({ 
  currentPage, 
  setCurrentPage, 
  pageSize, 
  setPageSize,
  totalItems = 0
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  return (
    <div className="pagination">
      <div className="pagination-size">
        <select 
          className="pagination-select" 
          value={pageSize} 
          onChange={e => setPageSize(parseInt(e.target.value))}
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
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
          Anterior
        </button>
        
        <span className="pagination-info">
          Página {currentPage}{totalPages > 0 ? ` de ${totalPages}` : ''}
        </span>
        
        <button 
          className="pagination-button"
          onClick={() => setCurrentPage(prev => totalPages ? Math.min(prev + 1, totalPages) : prev + 1)}
          disabled={totalPages > 0 && currentPage >= totalPages}
        >
          Próxima
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;