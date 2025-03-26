import React, { useState, useEffect } from "react";
import AdicionarFoto from '../components/AdicionarFoto';
import AtualizarFoto from '../components/AtualizarFoto';
import DeleteFoto from '../components/DeleteFoto';
import MostrarFoto from '../components/MostrarFoto';
import FotoGrid from '../components/FotoGrid';
import { Plus } from "lucide-react";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [photos, setPhotos] = useState([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [photoToEdit, setPhotoToEdit] = useState(null);
    const [photoToDelete, setPhotoToDelete] = useState(null);
    const [photoToView, setPhotoToView] = useState(null);
    const [error, setError] = useState(null);

    // Função para buscar as fotos do backend
    const fetchPhotos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/fotos");
            setPhotos(response.data);
            if (setError) setError(null);
        } catch (error) {
            console.error('Error fetching photos:', error);
            setError('Failed to load photos. Please ensure the backend server is running on port 3000.');
            setPhotos([]);
        }
    };
    
    // Buscar fotos ao montar o componente
    useEffect(() => {
        fetchPhotos();
    }, []);

    const handleUpload = async (newPhoto) => {
        if (!newPhoto || !newPhoto.file || !newPhoto.alternativo || !newPhoto.title) {
            console.error("Erro: Dados inválidos ou incompletos.");
            return;
        }
        const formData = new FormData();
        formData.append("foto", newPhoto.file); 
        formData.append("alternativo", newPhoto.alternativo);
        formData.append("title", newPhoto.title);
    
        try {
            const response = await axios.post("http://localhost:3000/fotos", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            if (response.status === 201) {
                const data = response.data;
                setPhotos(prevPhotos => [...prevPhotos, {
                    ...data,
                    url: `http://localhost:3000/public/${data.caminho}`
                }]);
                setIsUploadModalOpen(false);
            }
        } catch (error) {
            console.error("Erro ao enviar a foto:", error);
        }
    };
    

    // Editar uma foto existente
    const handleEdit = async (updatedPhoto) => {
        setPhotos((prev) =>
            prev.map((photo) => (photo.id === updatedPhoto.id ? updatedPhoto : photo))
        );
        setPhotoToEdit(null);
    };

    // Excluir uma foto
    const handleDelete = async () => {
        if (!photoToDelete || !photoToDelete.id_foto) {
            console.error("Erro: ID da foto não encontrado", photoToDelete);
            return;
        }
    
        try {
            console.log("Deletando foto com ID:", photoToDelete.id_foto);
            await axios.delete(`http://localhost:3000/fotos/${photoToDelete.id_foto}`);
            fetchPhotos(); // Atualiza a lista após deletar
        } catch (error) {
            console.error("Erro ao excluir foto:", error.response ? error.response.data : error.message);
        }
        setPhotoToDelete(null);
    };
    

    return (
        <div className="container">
            <header className="header">
                <div className="header-content">
                    <h1 className="title">Sistema simples de Upload</h1>
                    <button onClick={() => setIsUploadModalOpen(true)} className="upload-btn">
                        <Plus className="icon" />
                        Upload Photo
                    </button>
                </div>
            </header>

            <main className="main-content">
            <FotoGrid
    photos={photos}
    onEdit={setPhotoToEdit}
    onDelete={(photo) => {
        console.log("Selecionando foto para deletar:", photo); // Log para debug
        setPhotoToDelete(photo);
    }}
    onView={setPhotoToView}
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
                />
            )}
        </div>
    );
};

export default Home;