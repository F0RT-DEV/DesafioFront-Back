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
    if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        const fileType = selectedFile.type;

        // Verifique se o tipo MIME é válido
        if (fileType.startsWith('image/')) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            console.error("Arquivo não é uma imagem válida.");
        }
    }
}, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1, // Limitar a um arquivo
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !alternativo || !title) {
        console.error("Erro: Todos os campos são obrigatórios!");
        return;
    }

    // Verifique o tipo MIME do arquivo
    const validMimeTypes = ['image/jpeg', 'image/png','image/jpg'];
    if (!validMimeTypes.includes(file.type)) {
        console.error("Erro: Tipo de arquivo inválido.");
        return;
    }

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("alternativo", alternativo);
    formData.append("title", title);

    // Debug: Verifique os dados antes do envio
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const response = await axios.post("http://localhost:3000/fotos", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        console.log("Foto enviada com sucesso:", response.data);
        onUpload({ file, alternativo, title }); // Chame a função onUpload se necessário
    } catch (error) {
        console.error("Erro ao enviar a foto:", error.response ? error.response.data : error.message);
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