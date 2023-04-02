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


const SECRET = process.env.SECRET;

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
                console.log(err);
                res.json({ "msg": err });
            }
        })
    }
});


// *************************LOGIN*************************

adminAuthRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        console.log(req.body);
        const admin = await AdminModel.findOne({ email });
        console.log(admin);
        if (admin) {
            bcrypt.compare(password, admin.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ adminId: admin._id }, SECRET);
                    // req.headers.authorization = token;
                    res.json({ "msg": `${admin.first_name} has logged in successfully!!`, "admin": admin._id, "token": token });
                }
                else {
                    res.json({ "msg": "Invalid credentials", "error": err });
                }
            })
        }
        else {
            res.json({ "msg": "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while admin login", "error": error });
    }
});

// *************************EXPORT*************************

module.exports = {
    adminAuthRouter
};
