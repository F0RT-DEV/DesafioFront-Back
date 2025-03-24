import React from 'react'

const MostrarFoto = () => {
    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
    
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
    
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
    
          <div className="max-w-7xl w-full">
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h2 className="text-2xl font-semibold text-white mb-2">{photo.title}</h2>
              {photo.description && (
                <p className="text-white/90">{photo.description}</p>
              )}
            </div>
          </div>
        </div>
      );
}

export default MostrarFoto
