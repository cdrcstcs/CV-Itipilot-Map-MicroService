import React, { useEffect, useState } from 'react';// eslint-disable-line no-unused-vars
import axios from 'axios';
export const Avartar = ({imageId}) => {
  console.log(imageId);
  const [image, setImage] = useState(null);
  const fetchImage = async () => {
      try {
          const response = await axios.get(`http://localhost:4500/map_i/${imageId}`);
          setImage(response.data.image);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };
useEffect(() => {
    fetchImage();
}, []);
return (
  <div>
    {image ? (
      <div>
        <img
          src={`http://localhost:4500/${image}`}
          alt={image}
          className="w-8 h-8 rounded-full"
        />
      </div>
    ) : (
      <p className="text-gray-500">Loading...</p>
    )}
  </div>
);
};