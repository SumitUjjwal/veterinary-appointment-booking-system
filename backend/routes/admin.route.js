
// *******************EXTERNAL MODULES*******************

const express = require('express');
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

// *******************CUSTOM MODULES*******************

const { AdminModel } = require("../models/admin.model");
const { DoctorModel } = require("../models/doctors.model");
const { AppointmentModel } = require("../models/appointment.models");


// const SECRET = process.env.ADMIN_SECRET;

const adminRouter = express.Router();
adminRouter.use(express.json());


// *************************WELCOME*************************

adminRouter.get("/", async (req, res) => {
    res.json({ "msg": "Admin Routes" });
});


// *************************DOCTORS LIST*************************

adminRouter.get("/doctors", async (req, res) => {
    const docId = req.query.id;
    try {
        if (docId) {
            const doctor = await DoctorModel.findOne({ id: docId });
            const appointments = await AppointmentModel.find({ doctorId: docId });
            if (doctor) {
                res.json({ doctor, appointments });
            }
            else {
                res.json({ "Error": "Invalid Doctor ID" });
            }
        }
        else {
            const doctorList = await DoctorModel.find();
            res.json({ doctorList });
        }
    } catch (error) {
        console.log(error);
        res.json({ "Error": error });
    }
});


// *************************APPOINTMENTS LIST*************************

adminRouter.get("/appointments", async (req, res) => {
    const appointmentId = req.query.id;
    try {
        if (appointmentId) {
            const appointment = await AppointmentModel.findOne({ id: appointmentId });
            res.json({ appointment });
        }
        else {
            const appointments = await AppointmentModel.find();
            res.json({ appointments });
        }
    } catch (error) {
        console.log(error);
        res.json({ "Error": error });
    }
})


// // *************************ADD A NEW DOCTOR*************************

// adminRouter.post("/addDoctor", async(req, res) => {

// })


// *************************UPDATE DOCTOR INFO*************************

adminRouter.patch("/updateDoctor/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    try {
        const doctor = await DoctorModel.findByIdAndUpdate(id, payload);
        res.json({ "msg": `Doctor info associated with id: ${id} has been updated successfully` });
    } catch (error) {
        console.log(error);
        res.json({ "Error": error.message });
    }
});


// *************************REMOVE A DOCTOR*************************

adminRouter.delete("/removeDoctor/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const doctor = await DoctorModel.findByIdAndDelete(id);
        res.json({ "msg": `Doctor info associated with id: ${id} has been removed successfully` })
    } catch (error) {
        console.log(error);
        res.json({ "Error": error.message });
    }
});


module.exports = {
    adminRouter
}