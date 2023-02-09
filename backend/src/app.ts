// External dependencies.
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

// Types definitions.
import { Express } from "express";

// Get environment variables.
dotenv.config({ path: __dirname + "/./../../.env" });

// Internal dependencies.
const packageFile = require("../../package.json");

// Middleware.
const authz = require("./middleware/authz");

// Controllers.
const controllerHealth = require("./controllers/health");
const controllerNotion = require("./controllers/services/notion");
const controllerHarvest = require("./controllers/services/harvest");

const port = process.env.BACKEND_PORT || 8000;
const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));

// Routing
const router = express.Router();

app.use(`/api/v${packageFile.version}`, router);
router.route("/health").get(controllerHealth);

router.post("/notion/database", authz.jwt, controllerNotion);
router.post("/harvest/time-entries", authz.jwt, controllerHarvest);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
