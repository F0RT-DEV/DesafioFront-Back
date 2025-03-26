import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import AdicionarFoto from '../components/AdicionarFoto';

function Home() {
  const [photos, setPhotos] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fotos', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      setPhotos(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Failed to load photos. Please ensure the backend server is running on port 3000.');
      setPhotos([]);
    }
  };

  const handleUpload = (newPhoto) => {
    setPhotos(prev => [newPhoto, ...prev]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Upload Photo
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id_foto} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`http://localhost:3000/public/${photo.caminho}`}
                alt={photo.alternativo}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{photo.alternativo}</h3>
              </div>
            </div>
          ))}
        </div>

        {isUploadModalOpen && (
          <AdicionarFoto
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={handleUpload}
          />
        )}
      </div>
    </div>
  );
}

export default Home;