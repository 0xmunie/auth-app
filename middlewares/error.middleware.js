const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const msg = error.msg || "Internal Error";
    res.status(status).send(msg);
}

export default errorHandler;