import React, { useEffect, useState } from 'react';
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
          <img src={`http://localhost:4000/${image}`} alt={image} style={{width:'30px', height:'30px', borderRadius:'50%'}}/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};