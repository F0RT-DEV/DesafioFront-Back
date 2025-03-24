import React, { useState } from "react";
import AdicionarFoto from '../components/AdicionarFoto';
import AtualizarFoto from '../components/AtualizarFoto';
import DeleteFoto from '../components/DeleteFoto';
import MostrarFoto from '../components/MostrarFoto';
import FotoGrid from '../components/FotoGrid';
import { Plus } from "lucide-react";

const initialPhotos = [
    {
      id: '1',
      title: 'Mountain Landscape',
      description: 'Beautiful mountain view at sunset',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Ocean Waves',
      description: 'Peaceful ocean waves at dawn',
      url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Forest Path',
      description: 'Mystical forest path in autumn',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      createdAt: new Date().toISOString(),
    },
  ];
const Home = () => {
    const [photos, setPhotos] = useState(initialPhotos);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [photoToEdit, setPhotoToEdit] = useState(null);
    const [photoToDelete, setPhotoToDelete] = useState(null);
    const [photoToView, setPhotoToView] = useState(null);
  
    const handleUpload = async (formData) => {
      // Simulate upload - In a real app, you'd send this to your backend
      const newPhoto = {
        id: Math.random().toString(),
        title: formData.get('title'),
        description: formData.get('description'),
        url: URL.createObjectURL(formData.get('image')),
        createdAt: new Date().toISOString(),
      };
      setPhotos((prev) => [newPhoto, ...prev]);
    };
  
    const handleEdit = async (updatedPhoto) => {
      setPhotos((prev) =>
        prev.map((photo) =>
          photo.id === updatedPhoto.id ? updatedPhoto : photo
        )
      );
    };
  
    const handleDelete = async () => {
      if (!photoToDelete) return;
      setPhotos((prev) => prev.filter((photo) => photo.id !== photoToDelete.id));
      setPhotoToDelete(null);
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Photo Gallery</h1>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Upload Photo
              </button>
            </div>
          </div>
        </header>
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FotoGrid
            photos={photos}
            onEdit={setPhotoToEdit}
            onDelete={setPhotoToDelete}
          />
        </main>
  
        {isUploadModalOpen && (
          <AdicionarFoto
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={handleUpload}
          />
        )}
  
        {photoToEdit && (
          <AtualizarFoto
            photo={photoToEdit}
            onClose={() => setPhotoToEdit(null)}
            onSave={handleEdit}
          />
        )}
  
        {photoToDelete && (
          <DeleteFoto
            photo={photoToDelete}
            onConfirm={handleDelete}
            onCancel={() => setPhotoToDelete(null)}
          />
        )}

        {photoToView && (
         <MostrarFoto
            photo={photoToView}
            onClose={() => setPhotoToView(null)}
            onNext={handleNextPhoto}
            onPrevious={handlePreviousPhoto}
        />
        )}
      </div>
    );
}

export default Home

