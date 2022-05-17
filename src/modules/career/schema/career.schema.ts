import mongoose from "mongoose";

export const CareerSchema = new mongoose.Schema({
    name: { type: String },
    instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institute',
    },
    description: { type: String },
}, {
    timestamps: true,
    collection: "careers"
});
