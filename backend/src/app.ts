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
const router = require("./router");

const port = process.env.BACKEND_PORT || 8000;
const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));

// Routing.
app.use(`/api/v${packageFile.version}`, router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
