// External dependencies.
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

// Types definitions.
import { Express } from "express";

// Internal dependencies.
const packageFile = require("../../package.json");

// Controllers.
const controllerHealth = require("./controllers/health");

dotenv.config();

const port = process.env.PORT || 8000;
const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));

// Routing
const router = express.Router();

app.use(`/api/v${packageFile.version}`, router);
router.route("/health").get(controllerHealth);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
