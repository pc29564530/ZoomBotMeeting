const express = require('express');
const app = express();
const ff = require('./index.js');
const {browserFunction} = require('./index.js');
var bodyParser = require('body-parser')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/api/link', (req, res) => {
  const {link } = req.body;
  browserFunction(link);
  res.status(200).json('Meeting link received');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

