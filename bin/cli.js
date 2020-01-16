#!/usr/bin/env node

const app = require('../index');

const [, , ...args] = process.argv;
let port;

args[0] ? (port = args[0]) : (port = 3000);

app.listen(port, () => {
  console.log(`Server Running on PORT ${port}`);
});
