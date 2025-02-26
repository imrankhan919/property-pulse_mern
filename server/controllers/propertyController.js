const expressAsyncHandler = require("express-async-handler");
const Property = require("../models/propertySchema");

const getProperties = async (req, res) => {
  res.send("All Properties");
};

const getProperty = async (req, res) => {
  res.send("Single Property");
};

const addProperty = expressAsyncHandler(async (req, res) => {
  const newProperty = await Property.create(req.body);

  if (!newProperty) {
    res.status(400);
    throw new Error("Property Not Created");
  }

  res.status(201).json(newProperty);
});

const updateProperty = async (req, res) => {
  res.send("Property Updated!!");
};

const removeProperty = async (req, res) => {
  res.send("Property Removed!!");
};

module.exports = {
  getProperties,
  getProperty,
  addProperty,
  updateProperty,
  removeProperty,
};
