import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TagPage({ tagId }) {
  const [tag, setTag] = useState(null);

  useEffect(() => {
    fetchTagById();
  }, [tagId]);

  const fetchTagById = async () => {
    try {
      const response = await axios.get(`http://localhost:4500/map_t/${tagId}`); // Replace '/api/tags' with your actual API endpoint
      setTag(response.data);
    } catch (error) {
      console.error('Error fetching tag:', error);
    }
  };
  return (
    <p>Value: {tag.value}</p>
  );
}

export default TagPage;
