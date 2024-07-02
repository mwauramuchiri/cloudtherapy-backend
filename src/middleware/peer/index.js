const Match = require('../../lib/match');
const Api = require('../../utils/api');

// Match peers
const matchPeers = (req, res, next) => {
    Api.attachErrorHandler(res,
        Match.matchPeers(req.params.uid).then(async (matches) => {
            const message = matches.length ? "Matches found" : "No matches were found";
            const response = Api.getResponse(true, message, {
                count: matches.length
            });

            res.status(response.statusCode).json(response);
            next();
        })
    );
};

module.exports = {
    matchPeers
}