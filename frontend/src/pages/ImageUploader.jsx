import React, { useState } from 'react';// eslint-disable-line no-unused-vars
import axios from 'axios';

export const ImageUploader = ({ onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewURL(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(selectedFile);
        console.log(formData);
        if (!formData.get('file')) {
            console.error('File in FormData is null.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4500/map_u', formData);
            if (response.data && response.data._id) {
                onImageUpload(response.data._id);
            }
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center ">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {previewURL && (
              <div className="mb-4">
                <img
                  src={previewURL}
                  alt="Preview"
                  className="max-w-full h-16 object-contain"
                />
              </div>
            )}
            <button
              onClick={handleUpload}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              Upload
            </button>
          </div>
        </div>
      );
};
