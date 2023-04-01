// sign in
// sign up
// list out appointments containing that particular doctor id
// update the appointment status - confirm, cancel and completed - after updating send mail to petOwner


const { DoctorModel } = require("../models/doctors.model");
const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const doctorAuthRouter = express.Router();
doctorAuthRouter.use(express.json());

doctorAuthRouter.get("/", async (req, res) => {
    res.json({ "msg": "Doctor Route" });
})

doctorAuthRouter.post("/register", async (req, res) => {
    const { profile_img, first_name, last_name, specialization, experience, address, phone, fees, email, password } = req.body;
    try {
        let all_data = await DoctorModel.find({ email });
        if (all_data.length === 0) {
            bcrypt.hash(password, 5, async (err, val) => {
                if (err) {
                    res.send("login is not working");
                } else {
                    const Doctor = new DoctorModel({ profile_img, first_name, last_name, specialization, experience, address, phone, fees, email, password: val });
                    await Doctor.save();
                    res.send("Doctor registered Successfully");
                }
            })
        } else {
            res.send("Doctor already registered");
        }
    } catch (error) {
        res.send("Error in registering the Doctor");
        console.log(error);
    }
})


doctorAuthRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const Doctor = await DoctorModel.find({ email });
        const hashed_pass = Doctor[0].password;
        if (Doctor.length > 0) {
            bcrypt.compare(password, hashed_pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ Doctorid: Doctor[0]._id }, process.env.secret);
                    res.send({ "msg": "Login Successfull", "Access_Token": token, "docID": Doctor[0]._id });
                } else {
                    res.send("Wrong Credntials");
                }
            })
        } else {
            res.send("Doctor Not registered");
        }
    } catch (error) {
        res.send("some thing went wrong in login");
    }
})

doctorAuthRouter.get("/")

module.exports = {
    doctorAuthRouter
}