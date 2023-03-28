// Book Appointment Form
//         - Date
//         - DoctorID
//         - OwnerName
//         - Pet
//         - Email
//         - Phone
//         - location
//         - Description
// petIssues - {
    //  General Medical Question
    //  Diarrhea or bowel issues
    //  Ear infection
    //  Loss of appetite
    //  Throwing up
    //  Behavioural problems
    //  Skin rash or allergy
    //  Injury
    //  Dental issues
    //  Other
// }

const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    DoctorId: {type: String, required: true},
    ownerName: {type: String, required: true},
    ownerEmail: {type: String, required: true},
    ownerPhone: {type: Number, required: true},
    petCategory: {type: String, required: true},
    petIssue: {type: String, required: true},
    appointmentDate: {type: String, required: true}
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = {
    AppointmentModel
}