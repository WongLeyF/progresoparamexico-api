import mongoose from "mongoose";

export const InstituteSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    schoolGrade: { type: String },
    careers: [new mongoose.Schema({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career",
    })],
}, {
    // timestamps: true,
    collection: "institutes"
});