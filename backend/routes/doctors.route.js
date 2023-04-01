// sign in
// sign up
// list out appointments containing that particular doctor id
// update the appointment status - confirm, cancel and completed - after updating send mail to petOwner


const { DoctorModel } = require("../models/doctors.model");
const { AppointmentModel } = require("../models/appointment.models");
const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const doctorRouter = express.Router();
doctorRouter.use(express.json());

doctorRouter.get("/:id", async (req, res) => {
    const doctorId = req.params.id;
    try {
        const appointments = await AppointmentModel.find({doctorId});
        res.json(appointments);
    } catch (error) {
        console.log(error);
        res.json({"Error": error.message});
    }
});

module.exports = {
    doctorRouter
}