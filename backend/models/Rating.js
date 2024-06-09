import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    }
}, {timestamps:true});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;