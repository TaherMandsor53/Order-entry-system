import mongoose from 'mongoose';

const data = mongoose.Schema({
  name: String,
  surname: String,
  age: String,
});

const DataMessage = mongoose.model('DataMessage', data);

export default DataMessage;
