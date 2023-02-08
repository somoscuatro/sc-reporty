import { Request, Response } from "express";

module.exports = (request: Request, response: Response) => {
  return response.status(200).json({
    status: 200,
    message: "OK!",
  });
};
