const { Schema, model } = require('mongoose');
const uuid = require('uuid/v4');

const authSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  }
});

const AuthModel = model('token', authSchema);

const issue = async () => {
  const db_res = await new AuthModel({ token: uuid() }).save();
  return db_res.token;
};

const check = async token => {
  const doc = await AuthModel.findOne({ token });
  return doc ? true : false;
};

module.exports = {
  issue,
  check
};
