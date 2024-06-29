import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import CreateRating from './Rating';
import CreateTagPage from './Tag';
import { useRef } from 'react';
import { cookie } from '../cookies';
const CreateAttractionPage = ({x, y }) => {
  cookie.set('x', String(x), { path: '/' });
  cookie.set('y', String(y), { path: '/' });
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
    <div>
      <h1>Create Attraction or Create Hotel</h1>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <ImageUploader onImageUpload={handleImageUpload} />
      <CreateTagPage onTag={handleTag}></CreateTagPage>
      <CreateRating onRating={handleRating}></CreateRating>
      <button onClick={handleSubmit}>Create Attraction</button>
      <a href="http://localhost:4900/add" ref={hiddenLinkRef1} style={{ display: 'none' }}>Hidden Link</a>
        <button onClick={() => {
          handleClick1();
          replaceHistory(window.location.href);
        }}>Create Hotel</button>
    </div>
  );
};

export default CreateAttractionPage;
