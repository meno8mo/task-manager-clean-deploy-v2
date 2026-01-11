const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const connectMongo = async () => {
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};

module.exports = connectMongo;
