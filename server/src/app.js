const router = require('../routes/route');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(router);

app.listen(process.env.SERVE_PORT, () =>{
    console.log(`Server is running on port ${process.env.SERVE_PORT}`);
});