if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
// production = live app



const getYelpAPI = async() => {
  return axios.get(
    'https://api.yelp.com/v3/businesses/search?location=2650 NW 5th Ave Miami FL',
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    }
  );
};
//axio calls get stored in .data
// localhost:8080/api/yelp will make sewrver callk on web browswer
//because of express with response.json it will return results 
app.get('/api/yelp', async (request, response) => {
  try{
    const resp = await getYelpAPI()
  response.json(resp.data.businesses);

  } catch (e) {
    console.log(e);
    response.status(500).send({error: e.message})
  }
  
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.get('/api/yelp', (request, response) => {
  response.json({
    message: 'Hello from server.js'
  });
});
// END DEMO

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}...`);
});