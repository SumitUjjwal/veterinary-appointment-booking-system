// Book Appointment Form
//         - Date
//         - DoctorID
//         - OwnerName
//         - Pet
//         - Email
//         - Phone
//         - location
//         - Description

const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    DoctorId: {type: String, required: true},
    PetOwnerId: {type: String, required: true},
    
})