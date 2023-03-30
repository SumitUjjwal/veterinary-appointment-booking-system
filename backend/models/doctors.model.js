// doctor_id
// first_name
// last_name
// specialization - {
//      Small animal medicine,
//      large animal medicine, 
//      Equine medicine,
//      Exotic animal medicine, 
//      Surgery, 
//      Internal medicine,
//      Dermatology,
//      Oncology,
//      Cardiology,
//      Neurology 
// }
// email
// phone
// address

const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    fees: { type: Number, required: true },
    slots: { type: Number, required: true, default: 5 },
    password: { type: String, required: true }
});

const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = {
    DoctorModel
};

// {
//     "first_name":"Shiva",
//     "last_name":"Saraswat",
//     "specialization":"Skin Disease",
//     "experience":"5 years",
//     "address": "Mathura Uttar Pradesh",
//     "email":"shiva@gmail.com",
//     "phone":8494249421,
//     "fees":5000,
//     "password":"shiva"
//   }