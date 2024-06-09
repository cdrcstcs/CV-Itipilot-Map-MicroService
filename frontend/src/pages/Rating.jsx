import React, { useState } from 'react';
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
    <div>
      <h1>Create Rating</h1>
      <div>
        <label>Score:</label>
        <input type="number" name="score" value={formData.score} onChange={handleChange} required />
      </div>
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateRating;
