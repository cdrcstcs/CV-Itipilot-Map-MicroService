import React from 'react';
import TagPage from './TagPage';
import { SingleImage } from './ImagePage';
import RatingPage from './RatingPage';
import axios from 'axios';
import { useRef } from 'react';
const AttractionPage = ({ attraction }) => {
  const response = axios.post("http://localhost:4800/coordinateformap",{ x:attraction.x,y:attraction.y});
  console.log(response);
  const hiddenLinkRef1 = useRef(null);
  const handleClick1 = () => {
    hiddenLinkRef1.current.click();
  };
  const replaceHistory = (url) => {
    window.history.replaceState({}, document.title, url);
  };
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
        <a href="http://localhost:4900" ref={hiddenLinkRef1} style={{ display: 'none' }}>Hidden Link</a>
        <button onClick={() => {
          handleClick1();
          replaceHistory(window.location.href);
        }}>Find Nearby Hotels</button>
    </div>
  );
};

export default AttractionPage;
