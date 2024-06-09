import React, { useState } from 'react';
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
    <div>
      <h1>Create Tag</h1>
      <div>
        <label>Value:</label>
        <input type="text" name="value" value={formData.value} onChange={handleChange} required />
      </div>
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateTagPage;
