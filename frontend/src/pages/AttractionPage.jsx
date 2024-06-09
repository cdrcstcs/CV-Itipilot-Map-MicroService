import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TagPage from './TagPage';
import { SingleImage } from './ImagePage';
import RatingPage from './RatingPage';
const AttractionPage = ({ attractionId }) => {
  const [attraction, setAttraction] = useState(null);

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/map_a/${attractionId}`);
        setAttraction(response.data);
      } catch (error) {
        console.error('Error fetching attraction:', error);
      }
    };
    fetchAttraction();
  }, [attractionId]);
  return (
    <div>
      {attraction.imageId && <SingleImage imageId={attraction.imageId}></SingleImage>}
        <h1>Attraction Details</h1>
        <p>Name: {attraction.name}</p>
        <p>Address: {attraction.address}</p>
        <p>City: {attraction.city}</p>
        <p>X: {attraction.x}</p>
        <p>Y: {attraction.y}</p>
        {attraction.tagIds.map((tagId) => (
        <TagPage key={tagId} tagId={tagId} />
        ))}
        <RatingPage ratingId={attraction.ratingId}></RatingPage>
    </div>
  );
};

export default AttractionPage;
