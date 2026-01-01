import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "user Name is required"],
        trim: true,
        maxLength: [50, "user Name cannot exceed 50 characters"],
        minLength: [3, "user Name should have at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        maxLength: [50, "Email cannot exceed 50 characters"],
        minLength: [5, "Email should have at least 5 characters"],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password should have at least 6 characters"],
    },
    Timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;