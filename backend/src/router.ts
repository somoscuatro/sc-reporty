const express = require("express");

// Middleware.
const authz = require("./middleware/authz");

// Controllers.
const controllerHealth = require("./controllers/health");
const controllerNotion = require("./controllers/services/notion");
const controllerHarvest = require("./controllers/services/harvest");

const router = express.Router();

router.route("/health").get(controllerHealth);

router.post("/notion/database", authz.jwt, controllerNotion);
router.post("/harvest/time-entries", authz.jwt, controllerHarvest);

module.exports = router;
