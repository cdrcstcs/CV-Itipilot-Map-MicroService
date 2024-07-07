import React, { useState } from 'react';// eslint-disable-line no-unused-vars
import axios from 'axios';

const CreateTagPage = ({ onTag }) => {
  const [formData, setFormData] = useState({
    value: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4500/map_t', formData);
      console.log('Tag created:', response.data);
      onTag(response.data._id);
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create Tag</h1>
        <div className="mb-4">
          <label className="block font-medium mb-2">Value:</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTagPage;
