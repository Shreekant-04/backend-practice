const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('./../../models/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
// console.log(process.argv);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async Collection => {
  try {
    await Collection.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async Collection => {
  try {
    await Collection.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const setModel = model => {
  switch (model) {
    case 'users':
      return User;
    case 'tours':
      return Tour;
    case 'reviews':
      return Review;
    default:
      console.log('Invalid argument');
      process.exit();
  }
};

const model = setModel(process.argv[3]);

if (process.argv[2] === '--import') {
  importData(model);
} else if (process.argv[2] === '--delete') {
  deleteData(model);
}
