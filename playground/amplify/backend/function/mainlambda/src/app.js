
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios');

// declare a new express app
const app = express()

app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


// THIS IS THE MAIN REST API HANDLER


// listen api endpoint call for /people
app.get('/people', async (req, res) => {  
  try {
     // make request
    const {data} = await axios.get('https://swapi.dev/api//people');  

    // send response to client
    res.json({
      success: 'get call succeed!', 
      url: req.url, 
      people: data.results
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message
    })
  }
});

// After adding new endpoint we need to call AMPLIFY CONFIGURE API and add new endpoint path

// endpoint for another rest service
app.get('/coins', async (req, res) => {
  try {
    const {data} = await axios.get('https://api.coinlore.com/api/tickers');
    res.json({
      success: 'Look here coins',
      coins: data
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message
    })
  }
}); 
 
app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
