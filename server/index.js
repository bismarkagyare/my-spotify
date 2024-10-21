const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const { generateRandomString } = require("./utils");

const express = require("express");
const cors = require("cors");
const querystring = require("querystring");
const axios = require("axios");

const app = express();
app.use(cors());

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

console.log("client_id", client_id);

// step1: redirects user to authorisation page to get auth code
app.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email"; // define the scope of access
  const state = generateRandomString(16);
  const auth_query_parameters = querystring.stringify({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${auth_query_parameters}`);
});

// step2: callback after spotify authorisation
app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  // define options for token request exchange
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // step3: exchange authorisation code for access_token
  axios
    .post(authOptions.url, querystring.stringify(authOptions.form), { headers: authOptions.headers })
    .then((response) => {
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      // send tokens as JSON response
      res.json({ access_token, refresh_token });
      console.log("access_token". access_token);

      
    })
    .catch((error) => {
      console.error(error);
      res.send("Error during token exchange");
    });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
