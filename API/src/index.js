// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
require('express-async-errors');

const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandle = require('./app/middlewares/errorHandle');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandle);

app.listen(3001, () => console.log('Server startedd at http://localhost:3000'));
