import React, { useState, useEffect } from "react";
import AdicionarFoto from '../components/AdicionarFoto';
import AtualizarFoto from '../components/AtualizarFoto';
import DeleteFoto from '../components/DeleteFoto';
import MostrarFoto from '../components/MostrarFoto';
import FotoGrid from '../components/FotoGrid';
import { Plus } from "lucide-react";
import "./Home.css";

const Home = () => {
    const [photos, setPhotos] = useState([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [photoToEdit, setPhotoToEdit] = useState(null);
    const [photoToDelete, setPhotoToDelete] = useState(null);
    const [photoToView, setPhotoToView] = useState(null);

    // Função para buscar as fotos do backend
    const fetchPhotos = async () => {
        try {
            const response = await fetch("http://localhost:3000/fotos"); // Certifique-se de que 'response' está definido
            if (!response.ok) throw new Error("Erro ao buscar fotos"); // Verifica se a resposta é válida
    
            const data = await response.json();
        
            // Corrigir URL das imagens
            const formattedPhotos = data.map(photo => ({
                ...photo,
                url: `http://localhost:3000/public/img/${photo.caminho}` // Ajusta caminho correto
            }));
        
            setPhotos(formattedPhotos);
        } catch (error) {
            console.error("Erro ao carregar fotos:", error);
        }
    };
    
    // Buscar fotos ao montar o componente
    useEffect(() => {
        fetchPhotos();
    }, []);

    // Adicionar nova foto
    // Adicionar nova foto
const handleUpload = async (newPhoto) => {
    try {
        const response = await fetch("http://localhost:3000/fotos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPhoto),
        });

        if (response.ok) {
            const data = await response.json();
            // Adicionar a nova foto ao estado local
            setPhotos(prevPhotos => [...prevPhotos, {
                ...data,
                url: `http://localhost:3000/public/img/${data.caminho}`
            }]);
            setIsUploadModalOpen(false);
        } else {
            console.error("Erro ao adicionar foto");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
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
        if (!photoToDelete) return;
        try {
            await fetch(`http://localhost:3000/fotos/${photoToDelete.id}`, {
                method: "DELETE",
            });
            fetchPhotos(); // Atualiza a lista após deletar
        } catch (error) {
            console.error("Erro ao excluir foto:", error);
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
                    onDelete={setPhotoToDelete}
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

// import React, { useState } from "react";
// import AdicionarFoto from '../components/AdicionarFoto';
// import AtualizarFoto from '../components/AtualizarFoto';
// import DeleteFoto from '../components/DeleteFoto';
// import MostrarFoto from '../components/MostrarFoto';
// import FotoGrid from '../components/FotoGrid';
// import { Plus } from "lucide-react";
// import "./Home.css";

// const initialPhotos = [
//     {
//       id: '1',
//       title: 'Mountain Landscape',
//       description: 'Beautiful mountain view at sunset',
//       url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: '2',
//       title: 'Ocean Waves',
//       description: 'Peaceful ocean waves at dawn',
//       url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0',
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: '3',
//       title: 'Forest Path',
//       description: 'Mystical forest path in autumn',
//       url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
//       createdAt: new Date().toISOString(),
//     },
// ];

// const Home = () => {
//     const [photos, setPhotos] = useState(initialPhotos);
//     const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//     const [photoToEdit, setPhotoToEdit] = useState(null);
//     const [photoToDelete, setPhotoToDelete] = useState(null);
//     const [photoToView, setPhotoToView] = useState(null);
    
//     // const handleUpload = async (formData) => {
//     //     const newPhoto = {
//     //         id: Math.random().toString(),
//     //         title: formData.get('title'),
//     //         description: formData.get('description'),
//     //         url: URL.createObjectURL(formData.get('image')),
//     //         createdAt: new Date().toISOString(),
//     //     };
//     //     setPhotos((prev) => [newPhoto, ...prev]);
//     // };
//     const handleUpload = (newPhoto) => {
//         const uploadedPhoto = {
//           id: newPhoto.id_foto,
//           title: newPhoto.title,
//           description:newPhoto.alternativo, // O backend não salva descrição, ajustamos aqui
//           url: `http://localhost:3000/public/${newPhoto.caminho}`,
//           createdAt: new Date().toISOString(),
//         };
//         setPhotos((prev) => [uploadedPhoto, ...prev]);
//       };
      
//     const handleEdit = async (updatedPhoto) => {
//         setPhotos((prev) =>
//             prev.map((photo) =>
//             photo.id === updatedPhoto.id ? updatedPhoto : photo
//             )
//         );
//     };
  
//     const handleDelete = async () => {
//         if (!photoToDelete) return;
//         setPhotos((prev) => prev.filter((photo) => photo.id !== photoToDelete.id));
//         setPhotoToDelete(null);
//     };

//     const handlePhotoClick = (photo) => {
//         setPhotoToView(photo);
//     };
  
//     return (
//         <div className="container">
//             <header className="header">
//                 <div className="header-content">
//                     <h1 className="title">Sistema simples de Upload</h1>
//                     <button
//                         onClick={() => setIsUploadModalOpen(true)}
//                         className="upload-btn"
//                     >
//                         <Plus className="icon" />
//                         Upload Photo
//                     </button>
//                 </div>
//                 {isUploadModalOpen && (
//                 <AdicionarFoto onClose={() => setIsUploadModalOpen(false)} />
//             )}
//             </header>
  
           
  
//             <main className="main-content">
//                 <FotoGrid
//                     photos={photos}
//                     onEdit={setPhotoToEdit}
//                     onDelete={setPhotoToDelete}
//                     onView={handlePhotoClick}
//                 />
//             </main>
  
//             {isUploadModalOpen && (
//                 <AdicionarFoto
//                     onClose={() => setIsUploadModalOpen(false)}
//                     onUpload={handleUpload}
//                 />
//             )}
  
//             {photoToEdit && (
//                 <AtualizarFoto
//                     photo={photoToEdit}
//                     onClose={() => setPhotoToEdit(null)}
//                     onSave={handleEdit}
//                 />
//             )}
  
//             {photoToDelete && (
//                 <DeleteFoto
//                     photo={photoToDelete}
//                     onConfirm={handleDelete}
//                     onCancel={() => setPhotoToDelete(null)}
//                 />
//             )}

//             {photoToView !== null && (
//                 <MostrarFoto
//                     photo={photoToView}
//                     onClose={() => setPhotoToView(null)}
//                 />
//             )}
//         </div>
//     );
// };

// export default Home;

