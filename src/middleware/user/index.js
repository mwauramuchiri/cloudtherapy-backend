const User = require('../../lib/user');
const Api = require('../../utils/api');

// Match peers
const getUser = (req, res, next) => {
    Api.attachErrorHandler(res,
        User.getUser(req.params.uid).then((user) => {
            const response = Api.getResponse(true, "Successfully retrieved user", user);

            res.status(response.statusCode).json(response);
            next();
        })
    );
};

module.exports = {
    getUser
}