import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    role: {type: String, default: 'staff'}
})

export default mongoose.models.Staff || mongoose.model('Staff', staffSchema)