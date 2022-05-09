import mongoose from "mongoose";

export const InstituteSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    schoolGrade: { type: String },
    careerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
      }],
}, {
    // timestamps: true,
    collection: "institute"
});