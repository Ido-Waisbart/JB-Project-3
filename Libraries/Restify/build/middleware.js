"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errors_1 = require("./errors");
const enums_1 = require("./enums");
const app_config_1 = require("./app-config");
class ErrorMiddleware {
    catchAll(err, request, response, next) {
        // Print to console: 
        console.error(err);
        // Get HTTP status: 
        const status = err.status || enums_1.StatusCode.InternalServerError;
        // Is server error: 
        const isServerError = status >= 500 && status <= 599;
        // Get error message: 
        const message = isServerError && app_config_1.appConfig.isProduction ? "Some error, please try again." : err.message;
        // Return error to front: 
        response.status(status).send(message);
    }
    routeNotFound(request, response, next) {
        next(new errors_1.RouteNotFoundError(request.originalUrl, request.method));
    }
}
exports.errorMiddleware = new ErrorMiddleware();
