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
    profile_img: { type: String, default: "https://th.bing.com/th?id=OIP.cububKdcQPlH2Gpvs3EidgAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" },
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

