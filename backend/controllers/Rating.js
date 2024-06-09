import Rating from "../models/Rating.js";
// Create rating
async function createRating(req, res) {
  try {
    const rating = await Rating.create(req.body);
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Read all ratings
async function getAllRatings(req, res) {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Read single rating by ID
async function getRating(req, res) {
  try {
    const rating = await Rating.findById(req.params.id);
    console.log(rating);
    if (!rating) return res.status(404).json({ message: 'Rating not found' });
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update rating by ID
async function updateRating(req, res) {
  try {
    const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rating) return res.status(404).json({ message: 'Rating not found' });
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete rating by ID
async function deleteRating(req, res) {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);
    if (!rating) return res.status(404).json({ message: 'Rating not found' });
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createRating, getAllRatings, getRating, updateRating, deleteRating };
