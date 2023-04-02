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
    const appointmentStatus = req.query.status;
    try {
        let appointments;
        if(appointmentStatus){
            appointments = await AppointmentModel.find({doctorId, appointmentStatus});
        }
        else{
            appointments = await AppointmentModel.find({doctorId});
        }
        res.json(appointments);
        console.log(appointments);
    } catch (error) {
        console.log(error);
        res.json({"Error": error.message});
    }
});

doctorRouter.patch('/status/:id',async(req, res) => {
    // const id = req.params.id;
    // const status = req.body.status;
    // try{
    //     const appointments = await AppointmentModel.findOne({doctorId});
    //     console.log(appointments)
    //     if(appointments.length === 0){
    //         res.status(404).json({"Error": "No appointments found"});
    //     }
    //     appointments.status = status
    // }catch(err){console.log(err)} 
    const payload = req.body;
    const id = req.params.id;
    try {
        const appointment = await AppointmentModel.findByIdAndUpdate(id, payload);
        res.json({ "msg": `Appointment info associated with id: ${id} has been updated successfully` });
    } catch (error) {
        console.log(error);
        res.json({ "Error": error.message });
    }
})

module.exports = {
    doctorRouter
}