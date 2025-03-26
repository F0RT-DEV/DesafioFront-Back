import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload } from "lucide-react";
import axios from "axios";
import "./AdicionarFoto.css";

const AdicionarFoto = ({ onClose, onUpload }) => {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [alternativo, setAlternativo] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
  });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData();
//     formData.append('foto', file);
//     formData.append('alternativo', alternativo);
//     formData.append('title', title);

//     try {
//         const response = await fetch('http://localhost:3000/fotos', {
//             method: 'POST',
//             body: formData,
//         });

//         if (response.ok) {
//             onUpload(await response.json());
//             onClose();
//         }
//     } catch (error) {
//         console.error('Erro ao fazer upload:', error);
//     }
// };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Preencha todos os campos!");

    const formData = new FormData();
    formData.append("foto", file); // Deve corresponder ao campo esperado no backend
    formData.append("title", title); // Nome do campo no backend
    formData.append("alternativo", alternativo); // Nome do campo no backend

    try {
      const response = await axios.post("http://localhost:3000/fotos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("Resposta do backend:", response.data);
    onUpload(response.data); // Atualiza as fotos na Home
    onClose();
    } catch (error) {
      console.error("Erro ao enviar a foto:", error);
      alert("Erro ao enviar a foto!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Upload Photo</h2>
          <button onClick={onClose} className="close-button">
            <X className="icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
            <input {...getInputProps()} />
            {preview ? (
              <img src={preview} alt="Preview" className="preview-image" />
            ) : (
              <div className="dropzone-placeholder">
                <Upload className="upload-icon" />
                <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
              </div>
            )}
          </div>

          <div className="input-group">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
             <label>Descrição</label>
            <textarea
              value={alternativo}
               onChange={(e) => setAlternativo(e.target.value)}
              rows={3}
            />
           </div>
          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancelar
            </button>
            <button type="submit" disabled={!file || !title} className="upload-button">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarFoto;


// import React, { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { X, Upload } from "lucide-react";
// import "./AdicionarFoto.css"; // Importando o arquivo CSS

// const AdicionarFoto = ({ onClose }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [preview, setPreview] = useState(null);
//   const [file, setFile] = useState(null);

//   const onDrop = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     setFile(file);
//     setPreview(URL.createObjectURL(file));
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".png", ".jpg", ".jpeg", ".gif"],
//     },
//     maxFiles: 1,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("title", title);
//     formData.append("description", description);

//     // Simulação de upload (substitua com sua função real)
//     console.log("Enviando dados:", formData);
//     if (onClose) onClose();
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h2>Upload Photo</h2>
//           <button onClick={onClose} className="close-button">
//             <X className="icon" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="form-container">
//           <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
//             <input {...getInputProps()} />
//             {preview ? (
//               <img src={preview} alt="Preview" className="preview-image" />
//             ) : (
//               <div className="dropzone-placeholder">
//                 <Upload className="upload-icon" />
//                 <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
//               </div>
//             )}
//           </div>

//           <div className="input-group">
//             <label>Título</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Descrição</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={3}
//             />
//           </div>

//           <div className="button-group">
//             <button type="button" onClick={onClose} className="cancel-button">
//               Cancelar
//             </button>
//             <button type="submit" disabled={!file || !title} className="upload-button">
//               Upload
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdicionarFoto;

