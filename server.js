// install dependencies
const express = require("express");
const fs = require("fs");

// tell node we are creating an express server
const app = express();

// set up initial port
const PORT = process.env.PORT || 3000;

// middleware for data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// middleware for serving static resources
app.use(express.static("public"));

// require route modules
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// set up listening - "starts" server
app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});