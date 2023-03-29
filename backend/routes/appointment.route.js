// create a new appointment 

// *************************EXTERNAL MODULES*************************

const express = require('express');


// *************************CUSTOM MODULES*************************

const { AppointmentModel } = require("../models/appointment.models");


const appointmentRouter = express.Router();
appointmentRouter.use(express.json());

appointmentRouter.get("/", async(req,res) => {
    res.json({"msg": "Appointment Routes"});
});

// *************************CREATE APPOINTMENT*************************

appointmentRouter.post("/create", async (req, res) => {
    const { doctorId, ownerName, ownerEmail, ownerPhone, petCategory, petIssue, appointmentDate } = req.body;
    try {
        const appointment = new AppointmentModel({ doctorId, ownerName, ownerEmail, ownerPhone, petCategory, petIssue, appointmentDate });
        await appointment.save();
        res.json({ "msg": "Appointment Created successfully" });
    } catch (error) {
        console.log(error);
        request.json({ "msg": "Error in creating appointment"});
    }
});


// *************************EXPORT*************************

module.exports = {
    appointmentRouter
};
