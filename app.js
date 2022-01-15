const express = require('express');
const logger = require('morgan');
const weatherRoute = require('./routes/api/weather');
const status = require('./helpers/statusCodes');
const message = require('./helpers/messages');

const app = express();
app.use(logger('dev'));

app.use('/weather', weatherRoute);

app.use((_req, res) => {
  res.status(status.NOT_FOUND).send({ message: message.NOT_FOUND });
});

module.exports = app;
