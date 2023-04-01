// ******************************EXTERNAL NODULES******************************
const express = require('express');
require("dotenv").config();
const cors = require("cors");

// ******************************CUSTOM MODULES******************************
const { connection } = require("./config/db");
const { appointmentRouter } = require("./routes/appointment.route");
const { adminAuthRouter } = require("./routes/adminAuth.route");
const { doctorAuthRouter } = require("./routes/doctorsAuth.route");
const { authenticate } = require("./middleware/authentication.middleware");
const { adminRouter } = require("./routes/admin.route");
const { doctorRouter } = require("./routes/doctors.route");

// ******************************VARIABLES******************************
const PORT = process.env.PORT;
const app = express();

app.use(cors());

// ******************************ROUTES******************************
app.get('/', (req, res) => {
    res.json({
        "msg": "Welcome to The PetVet!"
    });
});

app.use("/appointment", appointmentRouter);
app.use("/adminAuth", adminAuthRouter);
app.use("/doctorAuth", doctorAuthRouter);
app.use(authenticate);
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);


// *************************CONNECTION*************************

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to Database");
        console.log(`Listening on ${PORT}`);
    } catch (error) {
        console.log("Failed while connecting to Database");
        console.log(error);
    }
});