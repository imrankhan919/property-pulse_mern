const getProperties = async (req, res) => {
  res.send("All Properties");
};

const getProperty = async (req, res) => {
  res.send("Single Property");
};

const addProperty = async (req, res) => {
  res.send("Property Added");
};

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
