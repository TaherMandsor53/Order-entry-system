import DataMessage from '../models/data.js';
export const getMessages = async (req, res) => {
  try {
    const dataMessages = await DataMessage.find();

    res.status(200).json(dataMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
