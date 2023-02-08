// Types definition.
import { Request, Response } from "express";

// Internal dependencies.
const database = require("./entities/database");

module.exports = async (request: Request, response: Response) => {
  const databaseQueryResponse = await database.query(request.body);

  if (databaseQueryResponse.status !== 200) {
    return response.status(databaseQueryResponse.status).json({
      message: databaseQueryResponse.message,
    });
  }

  return response.status(200).json({
    results: databaseQueryResponse.results,
  });
};
