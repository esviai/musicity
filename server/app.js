const express =require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/musicity');

const index = require('./routes/index');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);

app.listen(3000);
