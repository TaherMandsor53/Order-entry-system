import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const router = express.Router();
import DataMessage from './models/data.js';

const app = express();

dotenv.config();

app.use(cors());

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello to Memories Post');
});

router.route('/insertdata').post(function (req, res) {
  DataMessage.insertMany([{ name: 'Taher' }, { surname: 'Mandosarwala' }, { age: 5 }], function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server is running on ${PORT}`)))
  .catch(error => console.log(error.message));

mongoose.set('useFindAndModify', false);
