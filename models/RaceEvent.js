const mongoose = require("mongoose");

const raceEventSchema = new mongoose.Schema({
  title: String,
  track: String,
  trackLocation: String,
  car: String,
  date: Date,
  flag: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("RaceEvent", raceEventSchema);
