import mongoose from "mongoose";

export const ReportsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    result: [{ type: Object}],
    date: { type: Date, default: Date.now },
    description: { type: String },
},{
    timestamps: true,
    collection: "reports"
});