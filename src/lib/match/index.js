const ChatModel = require('../../models/chat');
const MatchModel = require('../../models/match');
const UserModel = require('../../models/user');

const MAX_POTENTIAL_MATCHES = 20;
const MAX_MATCHES = 2;


/** Find matches for peers 
 * @param {String} uid The id of the user to find matches for
 */
const matchPeers = async (uid) => {
    //TODO: Refactor this function into multiple smaller helper functions ~ ideally in separate files in the same directory
    // Find potential matches
    let potentialMatches = await UserModel.getMultipleUsers(MAX_POTENTIAL_MATCHES);

    // Remove self from potential matches
    potentialMatches = potentialMatches.filter(prospectDoc => {
        const _prospect = prospectDoc.data();
        return _prospect.uid !== uid;
    });

    // Find previous matches
    let prevMatches = await MatchModel.findPreviousMatches(uid);

    // Get the ids of the previous matches
    let prevMatchIds = prevMatches.map((prevMatch) => {
        const {
            prospect,
            initiator
        } = prevMatch.data();

        // If the prospect is the current user | return the initiator, and vice versa
        let _matchId = prospect.uid === uid ? initiator.uid : prospect.uid;
        return _matchId;
    });

    // Remove previous matches from potential matches
    potentialMatches = potentialMatches.filter(prospectDoc => {
        const _prospect = prospectDoc.data();
        const hasMatchedBefore = prevMatchIds.includes(_prospect.uid);
        return !hasMatchedBefore;
    });

    // Limit the number of matches returned
    potentialMatches = potentialMatches.filter((_, index) => index < MAX_MATCHES);

    // If no matches were found, return an empty array
    if (!potentialMatches.length) return [];

    const currentUser = await UserModel.getUserById(uid);

    //TODO: Refactor this into its own function
    // Add match to db and create chat for each match found
    const matchesFound = await potentialMatches.map(async (prospectDoc) => {
        const _prospect = prospectDoc.data();
        const matchData = {
            participantIds: [uid, _prospect.uid],
            initiator: currentUser,
            prospect: {
                ..._prospect
            }
        };

        //! Do not use this to return match data, we log full information for matches which MUST NOT reach accessors of this endpoint
        MatchModel.addMatch(matchData);

        //? We do not log email information or provider information when logging chat
        const _chatDataInserted = await ChatModel.createChat(matchData);
        return _chatDataInserted;
    });

    return matchesFound;
};

module.exports = {
    matchPeers
};