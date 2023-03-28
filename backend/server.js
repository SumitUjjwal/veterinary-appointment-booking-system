// ---------------------------External Modules------------------------------
const express = require('express');
require("dotenv").config();
const cors = require("cors");

// ---------------------------Custom Modules------------------------------
const { connection } = require("./config/db");

// ---------------------------Variables------------------------------
const PORT = process.env.PORT;
const app = express();

app.use(cors());

// ---------------------------Routes------------------------------
app.get('/', (req, res) => {
    res.json({
        "msg": "Welcome to The PetVet!"
    })
});

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to Database");
        console.log(`Listening on ${PORT}`);
    } catch (error) {
        console.log("Failed while connecting to Database");
        console.log(error);
    }
})