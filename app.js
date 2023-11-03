const express = require('express');

const app = express();

const connect = require('./schemas');
const productrouter = require('./routes/products.router');

app.use(express.json());

app.use('/api/products', productrouter);

connect();
app.listen(4000);
