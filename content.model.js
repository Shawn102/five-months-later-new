const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    message: { type: String, required: true },
    // isEditMode: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);

// Exporting my mongoose model
module.exports = Content;
