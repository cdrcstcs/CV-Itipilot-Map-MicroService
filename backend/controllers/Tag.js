import Tag from "../models/Tag.js";
async function createTag(req, res) {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Read all tags
async function getAllTags(req, res) {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Read single tag by ID
async function getTag(req, res) {
  try {
    const tag = await Tag.findById(req.params.id);
    console.log(tag);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update tag by ID
async function updateTag(req, res) {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete tag by ID
async function deleteTag(req, res) {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createTag, getAllTags, getTag, updateTag, deleteTag };
