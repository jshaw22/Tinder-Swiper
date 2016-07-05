//main starting point of the application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors')

//Database setup
mongoose.connect('mongodb://localhost:auth/auth')

//App Setup
app.use(cors()); // allow all CORS requests 
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);


//server setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log("Server Listening on:", port)
