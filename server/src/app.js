const router = require('../routes/route');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT || 8081, () =>{
    console.log("Server is running on port 8081");
});