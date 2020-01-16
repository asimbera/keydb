const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.once('error', console.error.bind(console, 'connection error:'));
db.on('open', () => console.log('Connected To Database'));

const kvSchema = new mongoose.Schema({
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

const KVModel = mongoose.model('kv', kvSchema);

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
