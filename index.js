const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.use(bodyParser.text({ type: '*/*' }));
app.use('/api', router);

module.exports = app;
