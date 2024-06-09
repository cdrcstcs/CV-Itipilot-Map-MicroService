import React, { useState, useEffect } from 'react';
import axios from 'axios';
function RatingPage({ ratingId }) {
  const [rating, setRating] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    fetchRatingById();
  }, [ratingId]);

  const fetchRatingById = async () => {
    try {
      const response = await axios.get(`http://localhost:4500/map_r/${ratingId}`); // Replace '/api/ratings' with your actual API endpoint
      setRating(response.data);
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };
  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:4500/map_r/${ratingId}`,{ score: rating.score + 1 });
      setRating({ ...rating, score: rating.score + 1 });
      setIsLiked(true);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };
  return (
    <div>
        <p>Score: {rating.score}</p>
        <button onClick={handleLike} disabled={isLiked}>Like</button>
    </div>
  );
}
export default RatingPage;
