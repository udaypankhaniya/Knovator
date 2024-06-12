const express = require('express');

require('./config/database');
require('dotenv').config();

const userPublic = require('./routes/users-public-router.js');
const user = require('./routes/users-router.js');
const post = require('./routes/post-router.js');
const app = express();

app.use(express.json());

app.use("/users/public", userPublic);
app.use("/users", user);
app.use("/posts", post);

// Middleware to Handle 404 Route error
app.use((_req, res,) => {
    res.status(404).send({ "message": "Not Found" });
});


app.listen(process.env.PORT, function () {
    console.log(`Linstening on port ${process.env.PORT}.`);
})

module.exports = app;