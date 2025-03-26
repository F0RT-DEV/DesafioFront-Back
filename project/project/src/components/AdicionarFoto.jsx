import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload } from "lucide-react";
import axios from "axios";

const AdicionarFoto = ({ onClose, onUpload }) => {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [alternativo, setAlternativo] = useState("");
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("foto", file);
    formData.append("alternativo", title);

    try {
      const response = await axios.post("http://localhost:3000/fotos", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      onUpload(response.data);
      onClose();
    } catch (error) {
      console.error("Error uploading photo:", error);
      setError(error.response?.data?.message || "Failed to upload photo. Please ensure the backend server is running.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upload Photo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center cursor-pointer
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
          >
            <input {...getInputProps()} />
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-48 mx-auto" />
            ) : (
              <div className="text-gray-600">
                <Upload className="w-12 h-12 mx-auto mb-2" />
                <p>Drag and drop an image here, or click to select</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || !title}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarFoto;