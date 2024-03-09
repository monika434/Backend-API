import { constants } from "../constants.js";

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = res.statusCode ? res.statusCode:500;
  switch(statusCode){
    case constants.VALIDATION_ERROR:
      res.json({
          title: "Validation Error",
          message: err.message,
          stacktrace: err.stack
      });
      break;
    case constants.NOT_FOUND:
      res.json({
          title: "Not Found",
          message: err.message,
          stacktrace: err.stack
      });
      break;
    default:
      res.json({
        title :"Not Found",
        message: err.message,
        stacktrace: err.stack
      });
  }
};
