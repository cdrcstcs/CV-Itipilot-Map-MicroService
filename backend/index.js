import express from "express";
import mongoose from "mongoose";
import { createAttraction, deleteAttraction, getAllAttractions, getAttraction, updateAttraction } from "./controllers/attraction.js";
import {createRating, getAllRatings, getRating, updateRating, deleteRating} from "./controllers/Rating.js";
import {createTag, getAllTags, getTag, updateTag, deleteTag} from "./controllers/Tag.js";
import { uploadImage, getImageById } from "./controllers/Image.js";
import { getAllUsers, updateUser, getUser } from "./controllers/User.js";
import multer from "multer";
import cors from "cors";
import path from "path";
import Image from "./models/Image.js";
import Tag from "./models/Tag.js";
import Rating from "./models/Rating.js";
import User from "./models/User.js";
import Attraction from "./models/Attraction.js";
import 'dotenv/config';
import { generateImageData,generateTags, generateRatings, generateUsers, generateAttractions } from "./data.js";
// import  jwt  from "jsonwebtoken";
const app = express();
app.use(express.json());
app.use(cors({
  origin: true,
}));
app.get('/map_au',getAllUsers);
app.post('/map_uu', updateUser);

app.post('/map_a', createAttraction);
app.get('/map_a', getAllAttractions);
app.get('/map_a/:id', getAttraction);
app.put('/map_a/:id', updateAttraction);
app.delete('/map_a/:id', deleteAttraction);

app.post('/map_t', createTag);
app.get('/map_t', getAllTags);
app.get('/map_t/:id', getTag);
app.put('/map_t/:id', updateTag);
app.delete('/map_t/:id', deleteTag);

app.post('/map_r', createRating);
app.get('/map_r', getAllRatings);
app.get('/map_r/:id', getRating);
app.put('/map_r/:id', updateRating);
app.delete('/map_r/:id', deleteRating);
app.get("/users",getUser);

app.use(express.static('uploads'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
app.post('/map_u', upload.single('file'), uploadImage);
app.get('/map_i/:id', getImageById);


mongoose.connect(process.env.MONGO_URL).then(async () => {
  await Image.deleteMany();
  await User.deleteMany();
  await Tag.deleteMany();
  await Rating.deleteMany();
  await Attraction.deleteMany();
  await Image.insertMany(generateImageData());
  await User.insertMany(await generateUsers());
  await Tag.insertMany(generateTags());
  await Rating.insertMany(generateRatings());
  await Attraction.insertMany(await generateAttractions());
  app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
