const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { DBRouter, AuthRouter } = require('./routes');
const AuthMiddleWare = require('./utils/auth_middleware');

mongoose.connect(process.env.DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.once('error', console.error.bind(console, 'connection error:'));
db.on('open', () => console.log('Connected To Database'));
const app = express();

app.use(bodyParser.text({ type: '*/*' }));
app.use('/api/auth', AuthRouter);
app.use('/api/db', AuthMiddleWare, DBRouter);

module.exports = app;
