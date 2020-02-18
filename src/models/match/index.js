const {
    db,
    admin
} = require("../../database");
const FieldValue = admin.firestore.FieldValue;

// Collection names
const MATCH_COLLECTION = db.collection('matches');


//* FUNCTIONS
// Filter out match data so that we are only left with relevant data
const _filterMatchData = (matchData) => {
    let filteredData = matchData;
    //TODO: Add implementation

    return filteredData;
};


/** Find previous matches for a user with the id of `id`
 * @param {String} uid The id of the user to find previous matches for
 */
const findPreviousMatches = async (uid) => {
    const {
        docs
    } = await MATCH_COLLECTION.where('participantIds', 'array-contains', uid).get();

    return docs;
}

/** Add a new match */
const addMatch = (matchData) => {
    matchData = _filterMatchData(matchData);

    return MATCH_COLLECTION.doc().set(matchData);
}

//* EXPORTS
module.exports = {
    addMatch,
    findPreviousMatches
}