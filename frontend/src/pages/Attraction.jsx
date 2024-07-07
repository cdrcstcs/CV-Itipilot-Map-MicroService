import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import { useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import CreateRating from './Rating';
import CreateTagPage from './Tag';
import { useRef } from 'react';
// import { cookie } from '../cookies';
const CreateAttractionPage = ({x, y }) => {
  // cookie.set('x', String(x), { path: '/' });
  // cookie.set('y', String(y), { path: '/' });
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    x: '',
    y: '',
    city: ''
  });
  const [imageId, setImageId] = useState(null);
  const [tagId, setTagId] = useState(null);
  const [tagIds, setTagIds] = useState([]);
  const [ratingId, setRatingId] = useState(null);

  useEffect(() => {
    if (tagId !== null) {
        setTagIds(prev => [...prev, tagId]);
    }
  }, [tagId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (imageId) => {
    setImageId(imageId); // Set the imageId state with the received image ID
    console.log(imageId);
  };

  const handleTag = (tagId) => {
    setTagId(tagId);
  };

  const handleRating = (ratingId) =>{
    setRatingId(ratingId);
  };

  const handleSubmit = async () => {
    try {
      // Update formData to include both imageId and tagIds
      const updatedFormData = {
        ...formData,
        x: x,
        y: y,
        imageId: imageId,
        tagIds: tagIds,
        ratingId: ratingId,
      };
      console.log(updatedFormData);
      const response = await axios.post('http://localhost:4500/map_a', updatedFormData);
      console.log('Attraction created:', response.data);
    } catch (error) {
      console.error('Error creating attraction:', error);
    }
  };
  const hiddenLinkRef1 = useRef(null);
  const handleClick1 = () => {
    hiddenLinkRef1.current.click();
  };
  const replaceHistory = (url) => {
    window.history.replaceState({}, document.title, url);
  };
  return (
    <div className=" max-h-96 overflow-y-auto py-10">
      <div className="w-96 mx-auto  bg-white rounded-lg shadow-md p-8">
        <h1 className="font-bold mb-6">Create Attraction or Create Hotel</h1>
        <div className="mb-6">
          <label className=" block font-medium mb-2">Name:</label>
          <input
            className="w-full  border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className=" block font-medium  mb-2">Address:</label>
          <input
            className="w-full  border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-2">City:</label>
          <input
            className="w-full  border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <ImageUploader onImageUpload={handleImageUpload} />
        <CreateTagPage onTag={handleTag} />
        <CreateRating onRating={handleRating} />
        <div className="flex justify-between">
          <button
            className="bg-blue-500  hover:bg-blue-600 font-medium py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Create Attraction
          </button>
          <a
            href="http://localhost:4900/add"
            ref={hiddenLinkRef1}
            className="hidden"
          >
            Hidden Link
          </a>
          <button
            className="bg-gray-500  hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"
            onClick={() => {
              handleClick1();
              replaceHistory(window.location.href);
            }}
          >
            Create Hotel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAttractionPage;
