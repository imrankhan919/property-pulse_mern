const express = require("express");
const {
  getProperties,
  addProperty,
  getProperty,
  updateProperty,
  removeProperty,
} = require("../controllers/propertyController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// get properties
router.get("/", getProperties);

// add property
router.post("/", protect, addProperty);

// get property
router.get("/:id", getProperty);

// update property
router.put("/:id", protect, updateProperty);

// remove property
router.delete("/:id", protect, removeProperty);

module.exports = router;
