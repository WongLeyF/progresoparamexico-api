import mongoose from 'mongoose';

// create schema for victim
export const VictimSchema = new mongoose.Schema(
  {
    name: { type: String },
    lastName: { type: String },
    email: { type: String },
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career',
    },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institute',
    },
  },
  {
    timestamps: true,
    collection: 'victims',
  },
);
