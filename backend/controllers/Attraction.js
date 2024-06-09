import Attraction from "../models/Attraction.js";
// Create attraction
async function createAttraction(req, res) {
  try {
    const attraction = await Attraction.create(req.body);
    res.status(201).json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Read all attractions
async function getAllAttractions(req, res) {
  try {
    const attractions = await Attraction.find();
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAttraction(req, res) {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) return res.status(404).json({ message: 'Attraction not found' });
    res.json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update attraction by ID
async function updateAttraction(req, res) {
  try {
    const attraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attraction) return res.status(404).json({ message: 'Attraction not found' });
    res.json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete attraction by ID
async function deleteAttraction(req, res) {
  try {
    const attraction = await Attraction.findByIdAndDelete(req.params.id);
    if (!attraction) return res.status(404).json({ message: 'Attraction not found' });
    res.json({ message: 'Attraction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {createAttraction, deleteAttraction, getAllAttractions, getAttraction, updateAttraction};
