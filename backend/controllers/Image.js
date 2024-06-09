import Image from "../models/Image.js";

async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        const image = new Image({
            image : req.file.filename
        });
        await image.save();
        res.json({ image });
    } catch (error) {
        console.error('Error saving image to MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getImageById(req, res) {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
        return res.status(404).send('Image not found');
        }
        res.json(image);
    } catch (error) {
        console.error('Error fetching image from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
}
export {uploadImage, getImageById};