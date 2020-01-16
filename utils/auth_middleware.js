const { check } = require('./auth_agent');

module.exports = async (req, res, next) => {
  const exist = await check(req.query.token);
  if (exist) {
    next();
  } else {
    res.json({
      error: true,
      message: 'Auth Failuare'
    });
  }
};
