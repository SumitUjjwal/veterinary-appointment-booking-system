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
const { mailer } = require("../middleware/mailer.middleware");
const nodemailer = require("nodemailer");

const doctorRouter = express.Router();
doctorRouter.use(express.json());

doctorRouter.get("/:id", async (req, res) => {
    const doctorId = req.params.id;
    const appointmentStatus = req.query.status;
    try {
        let appointments;
        if (appointmentStatus) {
            appointments = await AppointmentModel.find({ doctorId, appointmentStatus });
        }
        else {
            appointments = await AppointmentModel.find({ doctorId });
        }
        res.json(appointments);
        console.log(appointments);
    } catch (error) {
        console.log(error);
        res.json({ "Error": error.message });
    }
});

doctorRouter.patch('/status/:id', async (req, res) => {
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
        const appointments = await AppointmentModel.findByIdAndUpdate(id, payload);
        const appointment = await AppointmentModel.findById(id);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'thepetvet.india@gmail.com',
                pass: 'wibmoqfinpkiyxja'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        transporter.sendMail({
            to: `${appointment.ownerEmail}`,
            subject: "Appointment Status",
            html: `<div style="max-width: 90%; margin: 0 auto; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
        <p style="margin-bottom: 20px;">Dear <strong>${appointment.ownerName}</strong>,</p>
        <p style="margin-bottom: 20px;">Your appointment at The PetVet is ${appointment.appointmentStatus}. We will be happy to assist you with your pet's needs.</p>
        <p style="margin-bottom: 20px;">Here are the details of your appointment:</p>
        <ul style="list-style-type: none; margin: 0; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Name:</strong> ${appointment.ownerName}</li>
            <li style="margin-bottom: 10px;"><strong>Email:</strong> ${appointment.ownerEmail}</li>
            <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${appointment.ownerPhone}</li>
            <li style="margin-bottom: 10px;"><strong>Pet Category:</strong> ${appointment.petCategory}</li>
            <li style="margin-bottom: 10px;"><strong>Pet Issue:</strong> ${appointment.petIssue}</li>
            <li style="margin-bottom: 10px;"><strong>Appointment Date:</strong> ${appointment.appointmentDate}</li>
            <li style="margin-bottom: 10px;"><strong>Appointment Status:</strong> ${appointment.appointmentStatus}</li>
        </ul>
        <p style="margin-top: 20px; margin-bottom: 20px;">If any of the information above is incorrect or if you need to reschedule your appointment, please let us know as soon as possible.</p>
        <p style="margin-bottom: 20px;">We look forward to seeing you and your pet soon!</p>
        <p style="margin-bottom: 0;">Sincerely,</p>
        <p style="margin-top: 0; margin-bottom: 20px;">The PetVet Team</p>
      </div>`
        }).then(() => {
            console.log("mail sent successfully on " + appointment.ownerEmail);
        }).catch((err) => {
            console.log(err);
            console.log("err in sending mail");
            res.json({ "Error": err });
        })
        res.json({ "msg": `Appointment info associated with id: ${id} has been updated successfully` });
    } catch (error) {
        console.log(error);
        res.json({ "Error": error.message });
    }
})

module.exports = {
    doctorRouter
}