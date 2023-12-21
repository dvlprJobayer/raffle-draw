const notFound = (_req, _res, next) => {
    const error = new Error("Resource not found!");
    error.status = 404;
    next(error);
};

const errorHandler = (error, _req, res, _next) => {
    if (error.status) {
        return res.status(error.status).json(error.message);
    }

    res.status(500).json(error.message);
};

module.exports = [notFound, errorHandler];
