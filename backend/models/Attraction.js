import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  tagIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'}],
  ratingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  },
  city: {
    type: String,
    required: true
  }
});

const Attraction = mongoose.model('Attraction', attractionSchema);
export default Attraction;