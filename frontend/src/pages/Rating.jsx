import React, { useState } from 'react';// eslint-disable-line no-unused-vars
import axios from 'axios';

const CreateRating = ({ onRating }) => {
  const [formData, setFormData] = useState({
    score: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value, 10) }); // Convert value to integer
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4500/map_r', formData);
      console.log('Rating created:', response.data);
      onRating(response.data._id);
    } catch (error) {
      console.error('Error creating rating:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create Rating</h1>
        <div className="mb-4">
          <label className="block font-medium mb-2">Score:</label>
          <input
            type="number"
            name="score"
            value={formData.score}
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

export default CreateRating;
