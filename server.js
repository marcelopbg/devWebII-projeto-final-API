const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

require('./routes/auth.routes')(app);
require('./routes/house.routes')(app);
require('./routes/rent.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});