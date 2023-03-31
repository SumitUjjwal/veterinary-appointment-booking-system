const jwt = require("jsonwebtoken");
require('dotenv').config()
const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token,process.env.secret);
        if(decoded){
            const DoctorID = decoded.DoctorID;
            console.log(decoded)
            req.body.DoctorID = DoctorID
            next()
        }else{
            res.send("Please login first")
        }
    }else{
        res.send("Wrong Credentials")
    }
}

module.exports = {authenticate}