export function notFoundHandler(req, res, next) {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
}

export function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }

    let statusCode = Number(error.statusCode || error.status) || 500;
    if (statusCode < 400 || statusCode > 599) {
        statusCode = 500;
    }

    let message = error.message || "Internal server error";

    if (error.code === 11000) {
        statusCode = 409;
        message = "A record with this value already exists.";
    } else if (error.name === "CastError") {
        statusCode = 400;
        message = "Invalid value provided.";
    } else if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Invalid data provided.";
    } else if (error.type === "entity.parse.failed") {
        statusCode = 400;
        message = "Invalid JSON payload.";
    } else if (statusCode >= 500 && process.env.NODE_ENV === "production") {
        message = "Internal server error";
    }

    if (statusCode >= 500) {
        console.error(error);
    }

    return res.status(statusCode).json({
        success: false,
        message,
    });
}
