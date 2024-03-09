import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    userType:{
        type: String,
        enum: ["seller", "buyer", "admin"],
        required: true,
        default: "buyer"
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('User', userSchema);
export { User };