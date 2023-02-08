// Types definition.
import { Request, Response } from "express";

// Internal dependencies.
const timeEntries = require("./entities/time-entries");

module.exports = async (request: Request, response: Response) => {
  const timeEntriesQueryResponse = await timeEntries.query(request.body);

  if (timeEntriesQueryResponse.status !== 200) {
    return response.status(timeEntriesQueryResponse.status).json({
      message: timeEntriesQueryResponse.message,
    });
  }

  return response.status(200).json({
    results: timeEntriesQueryResponse.results,
  });
};
