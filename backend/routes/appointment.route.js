// create a new appointment 

// --------------------External Modules --------------------------------
const express = require('express');

// --------------------Custom Module --------------------------------
const { AppointmentModel } = require("../models/appointment.models");


const appointmentRouter = express.Router();
appointmentRouter.use(express.json());

appointmentRouter.get("/", async(req,res) => {
    res.json({"msg": "Appointment Routes"});
})

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
})


module.exports = {
    appointmentRouter
}
