const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true}
});

const AdminModel=mongoose.model("users",adminSchema);

module.exports={
    AdminModel
}