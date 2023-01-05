/* Empty JS object to act as endpoint for all routes */
let projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));





/*
    Create Local Server 
*/

// declare the port
const port = 8000;

const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}


//GET Route
app.get('/all' , (req,res) => {
    res.send(projectData)
});



//POST route
app.post('/add' , (req,res) => {
    newData = {
        date : req.body.date,
        temp : req.body.temp,
        content : req.body.conte
    }
    res.status(200).send(newData);
    projectData = newData;
})