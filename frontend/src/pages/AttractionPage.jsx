import React, { useState } from 'react';
import TagPage from './TagPage';
import { SingleImage } from './ImagePage';
import RatingPage from './RatingPage';
import axios from 'axios';
const AttractionPage = ({ attraction }) => {
  const response = axios.post("http://localhost:4800/coordinateformap",{ x:attraction.x,y:attraction.y});
  console.log(response);
  return (
    <div>
      {attraction.imageId && <SingleImage imageId={attraction.imageId}></SingleImage>}
        <h1>Attraction Details</h1>
        <p>Name: {attraction.name}</p>
        <p>Address: {attraction.address}</p>
        <p>City: {attraction.city}</p>
        {attraction.tagIds.map((tagId) => (
        <TagPage key={tagId} tagId={tagId} />
        ))}
        <RatingPage ratingId={attraction.ratingId}></RatingPage>
    </div>
  );
};

export default AttractionPage;
