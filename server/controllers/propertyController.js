const expressAsyncHandler = require("express-async-handler");
const Property = require("../models/propertySchema");

const getProperties = expressAsyncHandler(async (req, res) => {
  const properties = await Property.find();

  if (!properties) {
    res.status(404);
    throw new Error("No Property Found!!");
  }

  res.status(200).json(properties);
});

const getProperty = expressAsyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("No Property Found!!");
  }

  res.status(200).json(property);
});

const addProperty = expressAsyncHandler(async (req, res) => {
  const newProperty = await Property.create({
    user: req.user.id,
    ...req.body,
  });

  if (!newProperty) {
    res.status(400);
    throw new Error("Property Not Created");
  }

  res.status(201).json(newProperty);
});

const updateProperty = expressAsyncHandler(async (req, res) => {
  const updatedProperty = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedProperty) {
    res.status(400);
    throw new Error("Property Not Updated");
  }

  res.status(200).json(updatedProperty);
});

const removeProperty = expressAsyncHandler(async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);

  res.status(200).json({
    id: req.params.id,
    msg: "Property Removed!",
  });
});

module.exports = {
  getProperties,
  getProperty,
  addProperty,
  updateProperty,
  removeProperty,
};
