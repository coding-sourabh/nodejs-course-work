const express = require('express');
require('./db/mongoose'); // we don't need from this file, by simply requiring it here we assure that
// file runs and mongoose connects to database

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

app = express();

app.use(express.json()); // automatically parse incoming reques to json
app.use(userRouter);
app.use(taskRouter);

module.exports = {app}

