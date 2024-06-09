import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TagPage({ tagId }) {
  const [tag, setTag] = useState(null);

  useEffect(() => {
    const fetchTagById = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/map_t/${tagId}`);
        setTag(response.data);
      } catch (error) {
        console.error('Error fetching tag:', error);
      }
    };

    fetchTagById();
  }, [tagId]); // Run the effect whenever tagId changes

  return (
    <p>Value: {tag ? tag.value : 'Loading...'}</p>
  );
}

export default TagPage;
