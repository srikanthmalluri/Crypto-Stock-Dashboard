"use strict";
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const conUri = process.env.URI || "mongodb://localhost:27017/StockDB";
mongoose.connect(conUri)
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => console.log('Something went wrong ', err));
app.get("/", (req, res) => {
    return res.send("up");
});
app.listen(port, () => console.log(`Server is up and running on ${port}`));
