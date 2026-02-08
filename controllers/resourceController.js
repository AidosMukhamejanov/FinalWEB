const Resource = require("../models/Resource");

// CREATE
exports.create = async (req, res) => {
  const resource = await Resource.create({ ...req.body, user: req.user.id });
  res.json(resource);
};

// GET ALL
exports.getAll = async (req, res) => {
  const resources = await Resource.find({ user: req.user.id });
  res.json(resources);
};

// GET ONE
exports.getOne = async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return res.status(404).json({ message: "Resource not found" });
  res.json(resource);
};

// UPDATE
exports.update = async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return res.status(404).json({ message: "Resource not found" });
  if (resource.user.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  Object.assign(resource, req.body);
  await resource.save();
  res.json(resource);
};

// DELETE
exports.remove = async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return res.status(404).json({ message: "Resource not found" });
  if (resource.user.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  await resource.remove();
  res.json({ message: "Resource deleted" });
};
