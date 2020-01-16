const { Schema, model } = require('mongoose');

const kvSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: false,
    default: ''
  },
  token: {
    type: String,
    required: true
  }
});

const KVModel = model('kv', kvSchema);

const add = (key, value, token) => {
  return new KVModel({ key, value, token }).save();
};

const get = (key, token) => {
  return KVModel.findOne({
    key,
    token
  });
};

const del = (key, token) => {
  return KVModel.deleteOne({
    key,
    token
  });
};

const update = (id, value) => {
  return KVModel.findByIdAndUpdate(id, { value }, { new: true });
};

const list = token => {
  return KVModel.find({
    token
  });
};

module.exports = {
  add,
  get,
  del,
  update,
  list
};
