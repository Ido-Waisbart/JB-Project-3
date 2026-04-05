"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.ValidationError = exports.ResourceNotFoundError = exports.RouteNotFoundError = void 0;
const enums_1 = require("./enums");
class ClientError {
    status;
    message;
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}
class RouteNotFoundError extends ClientError {
    constructor(route, method) {
        super(enums_1.StatusCode.NotFound, `Route ${route} on method ${method} not found.`);
    }
}
exports.RouteNotFoundError = RouteNotFoundError;
class ResourceNotFoundError extends ClientError {
    constructor(id) {
        super(enums_1.StatusCode.NotFound, `id ${id} not found.`);
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
class ValidationError extends ClientError {
    constructor(message) {
        super(enums_1.StatusCode.BadRequest, message);
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends ClientError {
    constructor(message) {
        super(enums_1.StatusCode.Unauthorized, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
