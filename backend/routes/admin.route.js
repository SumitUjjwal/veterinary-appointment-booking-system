// admin register
// admin login
// get all doctors info
// get all appointments doctor wise
// get appointment list
// add new doctor
// remove a doctor
// update a doctor info

// *******************EXTERNAL MODULES*******************

const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// *******************CUSTOM MODULES*******************

const { AdminModel } = require("../models/admin.model");
const { DoctorModel } = require("../models/doctors.model");
const { AppointmentModel } = require("../models/appointment.models");


const adminRouter = express.Router();
adminRouter.use(express.json());


// *************************WELCOME*************************

adminRouter.get("/", async (req, res) => {
    res.json({ "msg": "Admin Routes" });
});


// *************************REGISTER*************************

adminRouter.post("/register", async (req, res) => {
    const { first_name, last_name, email, phone, password } = req.body;
    const checkExisting = await AdminModel.findOne({ email });
    if (checkExisting) {
        res.json({ "msg": "Already registered" });
    }
    else {
        bcrypt.hash(password, 2, async (err, hash) => {
            console.log(hash)
            if (hash) {
                const user = new AdminModel({ first_name, last_name, email, phone, password: hash });
                await user.save();
                res.json({ "msg": `${first_name} has been registered successfully!!` });
            }
            else {
                res.json({ "msg": err });
            }
        })
    }
});


// *************************LOGIN*************************

adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AdminModel.findOne({ email });
        console.log(user);
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    res.json({ "msg": `${user.first_name} has logged in successfully!!`, "admin": user._id });
                }
                else {
                    res.json({ "msg": "Invalid credentials", "error": err });
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while admin login", "error": error })
    }
});


// *************************DOCTORS LIST*************************

adminRouter.get("/doctors", async (req, res) => {
    const docId = req.query.docId;
    if (docId) {
        const doctor = await DoctorModel.findOne({ docId });
        const appointments = await AppointmentModel.find({doctorId: docId});
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
});

adminRouter.get("/appointments", async (req, res) => {
    
})


// *************************EXPORT*************************

module.exports = {
    adminRouter
};
