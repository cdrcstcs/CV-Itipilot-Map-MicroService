import User from '../models/User.js';
export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function updateUser(req, res) {
  try {
    // console.log(req.body);
    const { _id, ...updateData } = req.body;
    const user = await User.findByIdAndUpdate(_id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function getUser(req, res) {
	try {
    console.log('hello from backend');
    console.log(req.params.id);
	  const user = await User.findById(req.params.id);
    console.log(user);
	  if (!user) return res.status(404).json({ message: 'User not found' });
	  res.json(user);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  }