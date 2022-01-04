//models/index.js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DB = process.env.MONGO_STRING.replace(
    "<PASSWORD>",
    process.env.MONGO_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = conn;
