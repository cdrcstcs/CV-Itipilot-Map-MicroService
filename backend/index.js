import express from "express";
import mongoose from "mongoose";
import { createAttraction, deleteAttraction, getAllAttractions, getAttraction, updateAttraction } from "./controllers/attraction.js";
import {createRating, getAllRatings, getRating, updateRating, deleteRating} from "./controllers/Rating.js";
import {createTag, getAllTags, getTag, updateTag, deleteTag} from "./controllers/Tag.js";
import { uploadImage, getImageById } from "./controllers/Image.js";
import { getAllUsers, updateUser } from "./controllers/User.js";
import multer from "multer";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: true,
}));
const MONGO_URL = 'mongodb://localhost:27017/mongo-golang';
mongoose.connect(MONGO_URL)   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));


 let data = null;
 const getUserData = async (req, res) => {
   try {
     data = req.body.data;
       res.status(200).json("ok" );
     } catch (err) {
       console.log(err);
       res.status(500).json("Failed to get userData!");
     }
 };
 const getUserDataForClientSide = async (req, res) => {
   try {
     res.status(200).json({ data });
   } catch (err) {
     console.error("Error awaiting data:", err);
     res.status(500).json("Failed to get userData!");
   }
};
app.post("/userData", getUserData);
app.get("/userdataclient", getUserDataForClientSide);

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

app.listen(4500, () => {
  console.log("Backend server is running!");
});
