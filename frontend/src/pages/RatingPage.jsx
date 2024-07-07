import React, { useState, useEffect } from 'react';// eslint-disable-line no-unused-vars
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
    <div className="flex justify-center items-center h-9">
      {rating && (
        <div className="bg-white w-full flex items-center flex-col justify-center rounded-lg shadow-lg">
          <p className="text-gray-700 font-medium mb-4">Score: {rating.score}</p>
          <button
            onClick={handleLike}
            disabled={isLiked}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              isLiked
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Like
          </button>
        </div>
      )}
    </div>
  );
}

export default RatingPage;
