// create a new appointment 

// *************************EXTERNAL MODULES*************************

const express = require('express');


// *************************CUSTOM MODULES*************************

const { AppointmentModel } = require("../models/appointment.models");
const { DoctorModel } = require("../models/doctors.model");
const { mailer } = require("../middleware/mailer.middleware");

const appointmentRouter = express.Router();
appointmentRouter.use(express.json());


// *************************GET APPOINTMENT*************************

appointmentRouter.get("/", async (req, res) => {
    const id = req.query.id;
    try {
        const appointment = await AppointmentModel.find({ doctorId: id });
        if (appointment) {
            res.json({ appointment });
        }
        else {
            res.json({ "Error": "Invalid appointment id" });
        }
    } catch (error) {
        console.log(error);
        res.json({ "Error": error.message });
    };
});

// *************************CREATE APPOINTMENT*************************

appointmentRouter.post("/create", mailer, async (req, res) => {
    const { doctorId, ownerName, ownerEmail, ownerPhone, petCategory, petIssue, appointmentDate } = req.body;
    try {
        const appointment = new AppointmentModel({ doctorId, ownerName, ownerEmail, ownerPhone, petCategory, petIssue, appointmentDate });
        await appointment.save();
        res.json({ "msg": "Appointment Created successfully" });
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error in creating appointment" });
    }
});


// *************************DOCTORS LIST*************************

appointmentRouter.get("/doctors", async (req, res) => {
    console.log("doctor")
    try {
        const doctors = await DoctorModel.find();
        res.json({ doctors });
    } catch (error) {
        console.log(error);
        res.json({ "Error": error });
    }
});



// *************************EXPORT*************************

module.exports = {
    appointmentRouter
};
