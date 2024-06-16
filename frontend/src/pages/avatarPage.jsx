import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const Avartar = ({imageId}) => {
  const [image, setImage] = useState(null);
  const fetchImage = async () => {
      try {
          const response = await axios.get(`http://localhost:4000/images/${imageId}`);
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
          <img src={`http://localhost:4000/${image}`} alt={image} style={{width:'50px', height:'50px', borderRadius:'50%'}}/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};