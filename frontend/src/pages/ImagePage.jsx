
import React, { useEffect, useState } from 'react';// eslint-disable-line no-unused-vars
import axios from 'axios';
export const SingleImage = ({imageId}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await axios.get(`http://localhost:4500/map_i/${imageId}`);
      setImage(response.data.image);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-32">
      <img
        src={`http://localhost:4500/${image}`}
        alt={image}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};