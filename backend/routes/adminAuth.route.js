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
require("dotenv").config();

// *******************CUSTOM MODULES*******************

const { AdminModel } = require("../models/admin.model");
const { DoctorModel } = require("../models/doctors.model");
const { AppointmentModel } = require("../models/appointment.models");


const SECRET = process.env.ADMIN_SECRET;

const adminAuthRouter = express.Router();
adminAuthRouter.use(express.json());


// *************************WELCOME*************************

adminAuthRouter.get("/", async (req, res) => {
    res.json({ "msg": "Admin Auth Routes" });
});


// *************************REGISTER*************************

adminAuthRouter.post("/register", async (req, res) => {
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

adminAuthRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await AdminModel.findOne({ email });
        console.log(admin);
        if (admin) {
            bcrypt.compare(password, admin.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ adminId: admin._id }, SECRET);
                    req.headers.authorization = token;
                    res.json({ "msg": `${admin.first_name} has logged in successfully!!`, "admin": admin._id, "token": token });
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


// // *************************DOCTORS LIST*************************

// adminAuthRouter.get("/doctors", async (req, res) => {
//     const docId = req.query.docId;
//     try {
//         if (docId) {
//             const doctor = await DoctorModel.findOne({ id: docId });
//             const appointments = await AppointmentModel.find({ doctorId: docId });
//             if (doctor) {
//                 res.json({ doctor, appointments });
//             }
//             else {
//                 res.json({ "Error": "Invalid Doctor ID" });
//             }
//         }
//         else {
//             const doctorList = await DoctorModel.find();
//             res.json({ doctorList });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ "Error": error });
//     }
// });


// // *************************APPOINTMENTS LIST*************************

// adminAuthRouter.get("/appointments", async (req, res) => {
//     const appointmentId = req.query.appointmentId;
//     try {
//         if (appointmentId) {
//             const appointment = await AppointmentModel.findOne({ id: appointmentId });
//             res.json({ appointment });
//         }
//         else {
//             const appointments = await AppointmentModel.find();
//             res.json({ appointments });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ "Error": error });
//     }
// })


// // // *************************ADD A NEW DOCTOR*************************

// // adminAuthRouter.post("/addDoctor", async(req, res) => {

// // })


// // *************************UPDATE DOCTOR INFO*************************

// adminAuthRouter.patch("/updateDoctor/:id", async(req, res) => {
//     const payload = req.body;
//     const id = req.params.id;
//     try {
//         const doctor = await DoctorModel.findByIdAndUpdate(id, payload);
//         res.json({"msg": `Doctor info associated with id: ${id} has been updated successfully`})
//     } catch (error) {
//         console.log(error);
//         res.json({"Error": error.message});
//     }
// });


// // *************************REMOVE A DOCTOR*************************

// adminAuthRouter.delete("/removeDoctor/:id", async(req, res) => {
//     const id = req.params.id;
//     try {
//         const doctor = await DoctorModel.findByIdAndDelete({id});
//         res.json({"msg": `Doctor info associated with id: ${id} has been removed successfully`})
//     } catch (error) {
//         console.log(error);
//         res.json({"Error": error.message});
//     }
// });

// *************************EXPORT*************************

module.exports = {
    adminAuthRouter
};
