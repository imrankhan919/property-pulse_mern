const express = require("express");
const {
  getProperties,
  addProperty,
  getProperty,
  updateProperty,
  removeProperty,
} = require("../controllers/propertyController");
const router = express.Router();

// get properties
router.get("/", getProperties);

// add property
router.post("/", addProperty);

// get property
router.get("/:id", getProperty);

// update property
router.put("/:id", updateProperty);

// remove property
router.delete("/:id", removeProperty);

module.exports = router;
