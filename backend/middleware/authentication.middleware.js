const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET;

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (token) {
        const decoded = jwt.verify(token, SECRET);
        if (decoded) {
            // const DoctorID = decoded.DoctorID;
            // console.log(decoded)
            // req.body.DoctorID = DoctorID
            next()
        } else {
            res.send("Please login first")
        }
    } else {
        res.send("Wrong Credentials")
    }
}

module.exports = { authenticate }