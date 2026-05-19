const mongoose = require("mongoose");

const jobRequestSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },

  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true
  },

  category: {
    type: String,
    trim: true
  },

  location: {
    type: String,
    trim: true
  },

  contactName: {
    type: String,
    trim: true
  },

  contactEmail: {
    type: String,
    required: [true, "Contact email is required"],
    trim: true,
    lowercase: true,
    match: [
      /^\S+@\S+\.\S+$/,
      "Please enter a valid email address"
    ]
  },

  contactNumber: {
    type: String,
    trim: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  assignedTradesperson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  assignedAt: {
    type: Date,
    default: null
  },

  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  "JobRequest",
  jobRequestSchema
);