const DbAwareService = require('./db-aware-service');

class CustomerLocationService extends DbAwareService {
    /**
     * Get location ID for the given customer ID.
     * @param {int} customerId - The customer's ID.
     * @return {Promise} A Promise which resolves to the customer's location ID.
     */
    getLocation(customerId) {
        return this.connection.then((db) => (
            db.collection('customers').findOne({ customerId })
        )).then((customer) => (
            customer.locationId
        ));
    }
}

module.exports = CustomerLocationService;
