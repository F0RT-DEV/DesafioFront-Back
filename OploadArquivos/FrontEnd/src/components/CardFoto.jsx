import React, { useState } from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import clsx from 'clsx';

const CardFoto = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={photo.url} 
          alt={photo.title}
          className="w-full h-64 object-cover cursor-pointer"
          loading="lazy"
          onClick={() => onView(photo)}
        />
        
        <div className={clsx(
          "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end",
          "transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <h3 className="text-white font-semibold text-lg mb-1">{photo.title}</h3>
          {photo.description && (
            <p className="text-white/90 text-sm mb-2">{photo.description}</p>
          )}
          
          <div className="flex gap-2">
            <button
              onClick={() => onView(photo)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Eye className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onEdit(photo)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Edit2 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => onDelete(photo)}
              className="p-2 rounded-full bg-white/10 hover:bg-red-500/70 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
}

export default CardFoto
