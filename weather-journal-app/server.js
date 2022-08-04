// end points
// GET
const GET_DATA = "/getData";
// POST
const ADD_DATA = "/addData";
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
// require body-parser
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const portNumber = 8000;

const server = app.listen(portNumber  , onServerCalled);

function onServerCalled(){
    console.log(`Server is running on port number ${portNumber}`);
}

// GET REQUESTS

// /getData : get the latest data in weathe object
app.get(GET_DATA , getWeatherData);

function getWeatherData(req , res){
    console.log("GET REQUEST ON /getData");
    // sending project data
    res.send(projectData);
}

// POST REQUESTS 

app.post(ADD_DATA , addData);

function addData(req,res){
    console.log(req.body);
    projectData = req.body;
}