require('dotenv').config();

const express = require('express')
const cors = require('cors')
const querystring = require('querystring')
const axios = require('axios')

const app = express();
app.use(cors())

const client_id = process.env.SPOTIFY_CLIENT_ID; 
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

// redirects user to authorisation page
app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email'; // define the scope of access
  const auth_query_parameters = querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${auth_query_parameters}`);
})

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});
