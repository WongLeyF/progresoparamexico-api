import mongoose from "mongoose";

// create schema for victim
export const VictimSchema = new mongoose.Schema({
    name: { type: String },
    lastName: { type: String },
    age: { type: Number },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    career: new mongoose.Schema({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career",
    }),
    institute: new mongoose.Schema({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institute",
    }),
}, {
    timestamps: true,
    collection: "victims"
});