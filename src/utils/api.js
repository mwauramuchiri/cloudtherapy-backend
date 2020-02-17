module.exports.getResponse = (isOk, message, data, statusCode = 200) => {
    let response = {};
    response.ok = isOk;
    response.statusCode = statusCode;
    response.message = message;
    response.data = data || null;
    return response;
};

module.exports.getError = (message, error, statusCode = 500) => {
    statusCode = statusCode;
    let response = this.getResponse(false, message, null, statusCode);
    response.error = error;
    return response;
};

// Attaches an error handler to a function ~ returns an appropriate response
module.exports.attachErrorHandler = (res, fn) => { //? Intended to be called in middleware
    return fn.catch(err => {
        let apiResponse = this.getError(err.message, err);
        console.log(err);
        console.error(err.message);

        res.status(500).json(apiResponse);
    });
};