const Router = require('express').Router();
const dbAgent = require('../utils/db_agent');

// add route
Router.post('/:key', async (req, res) => {
  const token = req.query.token;
  const key = req.params.key;
  const body = req.body.trim();
  if (!key || !token) {
    res.json({
      error: true,
      message: 'Token and Key cant be empty.'
    });
  } else {
    try {
      const find_resp = await dbAgent.get(key, token);
      if (!find_resp) {
        const db_resp = await dbAgent.add(key, body, token);
        const { key: res_key, value: res_val } = db_resp;
        res.json({
          error: false,
          message: {
            key: res_key,
            val: res_val
          }
        });
      } else {
        const db_resp = await dbAgent.update(find_resp._id, body);
        const { key: res_key, value: res_val } = db_resp;
        res.json({
          error: false,
          message: {
            key: res_key,
            val: res_val
          }
        });
      }
    } catch (e) {
      console.log(e.message);
      res.json({
        error: true,
        message: e._message
      });
    }
  }
});

// get route
Router.get('/:key', async (req, res) => {
  const token = req.query.token;
  const key = req.params.key;
  if (!key || !token) {
    res.json({
      error: true,
      message: 'Token and Key cant be empty.'
    });
  } else {
    try {
      const db_resp = await dbAgent.get(key, token);
      if (!db_resp) throw new Error('Non Existant Key');
      const { key: res_key, value: res_val } = db_resp;
      res.json({
        error: false,
        message: {
          key: res_key,
          val: res_val
        }
      });
    } catch (e) {
      res.json({
        error: true,
        message: e.message
      });
    }
  }
});

// del route
Router.delete('/:key', async (req, res) => {
  const token = req.query.token;
  const key = req.params.key;
  if (!key || !token) {
    res.json({
      error: true,
      message: 'Token and Key cant be empty.'
    });
  } else {
    try {
      await dbAgent.del(key, token);
      res.json({
        error: false,
        message: null
      });
    } catch (e) {
      console.log(e.message);
      res.json({
        error: true,
        message: null
      });
    }
  }
});
// list route
Router.get('/', async (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.json({
      error: true,
      message: 'Token cant be empty.'
    });
  } else {
    try {
      const db_resp = await dbAgent.list(token);
      let val_res;
      db_resp.length > 0
        ? (val_res = db_resp.map(val => ({ key: val.key, value: val.value })))
        : (val_res = []);
      res.json({
        error: false,
        message: val_res
      });
    } catch (e) {
      console.log(e.message);
      res.json({
        error: true,
        message: null
      });
    }
  }
});

module.exports = Router;
