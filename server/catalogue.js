const DbAwareService = require('./db-aware-service');

class CatalogueService extends DbAwareService {
    /**
     * Filter the database for available channels based on the location ID.
     * UK-wide channels will always be returned, regardless of location ID.
     * @param {string} locationId - The location ID.
     * @return {Promise} A Promise which resolves to an array of channels.
     */
    getChannels(locationId) {
        return this.connection.then((db) => (
            db.collection('channels').find({
                $or: [{ locationId }, { locationId: null }],
            }).toArray()
        )).then((channels) => channels);
    }
}

module.exports = CatalogueService;
