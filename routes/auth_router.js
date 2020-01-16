const Router = require('express').Router();
const { issue } = require('../utils/auth_agent');

Router.get('/createToken', async (req, res) => {
  const token = await issue();
  res.send(token);
});

module.exports = Router;
