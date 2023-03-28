const mongoose = require('mongoose');
require("dotenv").config();
mongoose.set("strictQuery", true);

const MONGODB_URL = process.env.MONGODB_URL

const connection = mongoose.connect(MONGODB_URL);

module.exports = {
       connection
}