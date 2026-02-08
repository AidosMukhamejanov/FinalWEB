const RaceEvent = require("../models/RaceEvent");
const axios = require("axios");

exports.create = async (req, res) => {
  const event = await RaceEvent.create({ ...req.body, user: req.user.id });
  res.json(event);
};

exports.getAll = async (req, res) => {
  const events = await RaceEvent.find({ user: req.user.id });
  res.json(events);
};

exports.getOne = async (req, res) => {
  const event = await RaceEvent.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
};

exports.update = async (req, res) => {
  const event = await RaceEvent.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  if (event.user.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  Object.assign(event, req.body);
  await event.save();
  res.json(event);
};

exports.remove = async (req, res) => {
  await RaceEvent.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};

exports.getWeather = async (req, res) => {
  const event = await RaceEvent.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${event.trackLocation}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);

  res.json({
    track: event.track,
    location: event.trackLocation,
    temperature: response.data.main.temp,
    condition: response.data.weather[0].description,
    wind: response.data.wind.speed,
    humidity: response.data.main.humidity
  });
};
