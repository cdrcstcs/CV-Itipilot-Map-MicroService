import React from 'react';// eslint-disable-line no-unused-vars
import TagPage from './TagPage';
import { SingleImage } from './ImagePage';
import RatingPage from './RatingPage';
import { useRef } from 'react';
// import { cookie } from '../cookies';
const AttractionPage = ({ attraction }) => {
  // cookie.set('x', String(attraction.x), { path: '/' });
  // cookie.set('y', String(attraction.y), { path: '/' });
  const hiddenLinkRef1 = useRef(null);

  const handleClick1 = () => {
    hiddenLinkRef1.current.click();
  };
  const replaceHistory = (url) => {
    window.history.replaceState({}, document.title, url);
  };
  return (
    <div className="bg-gray-100 ">
      <div className="max-w-2xl h-3/5 mx-auto bg-white rounded-lg shadow-md p-8">
        {attraction.imageId && (
          <div className="mb-6">
            <SingleImage imageId={attraction.imageId} />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4">Attraction Details</h1>
        <div className="mb-4">
          <p className="font-medium text-gray-700">Name: {attraction.name}</p>
        </div>
        <div className="mb-4">
          <p className="font-medium text-gray-700">Address: {attraction.address}</p>
        </div>
        <div className="mb-4">
          <p className="font-medium text-gray-700">City: {attraction.city}</p>
        </div>
        {attraction.tagIds.map((tagId) => (
          <div key={tagId} className="mb-4">
            <TagPage tagId={tagId} />
          </div>
        ))}
        <div className="mb-4">
          <RatingPage ratingId={attraction.ratingId} />
        </div>
        <a
          href="http://localhost:4900"
          ref={hiddenLinkRef1}
          className="hidden"
        >
          Hidden Link
        </a>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white flex w-full mt-6 justify-center font-medium py-2 px-4 rounded-md"
          onClick={() => {
            handleClick1();
            replaceHistory(window.location.href);
          }}
        >
          Filter Hotels
        </button>
      </div>
    </div>
  );
};

export default AttractionPage;
