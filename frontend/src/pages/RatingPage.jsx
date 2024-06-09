import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RatingPage({ ratingId }) {
  const [rating, setRating] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchRatingById = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/map_r/${ratingId}`);
        setRating(response.data);
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRatingById(); // Call the function inside useEffect
  }, [ratingId]); // Run the effect whenever ratingId changes

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:4500/map_r/${ratingId}`, { score: rating.score + 1 });
      setRating({ ...rating, score: rating.score + 1 });
      setIsLiked(true);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <div>
      {rating && (
        <React.Fragment>
          <p>Score: {rating.score}</p>
          <button onClick={handleLike} disabled={isLiked}>Like</button>
        </React.Fragment>
      )}
    </div>
  );
}

export default RatingPage;
