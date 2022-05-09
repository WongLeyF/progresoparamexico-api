import mongoose from "mongoose";

//create model for aggressor
export const AggressorSchema = new mongoose.Schema({
    name: { type: String },
    lastName: { type: String },
    age: { type: Number },
    type: {
        type: String,
        enum: [
            "classmate", "schoolmate", "teacher", "school relationship",
            "external relationship", "principal", "administrative", "multipurpose",
            "non-school", "other"
        ]
    },
    gender: { type: String, enum: ["M", "F", "O"] },
    instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institute',
    }
}, {
    timestamps: true,
    collection: "agressor"
});