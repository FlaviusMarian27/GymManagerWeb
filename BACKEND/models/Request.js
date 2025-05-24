// models/Request.js
const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  client:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status:  { type: String, default: "În așteptare" },
  viewedByClient: { type: Boolean, default: false },   // <--- ADAUGĂ ASTA!
}, { timestamps: true });

module.exports = mongoose.model("Request", RequestSchema);