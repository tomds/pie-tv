const DbAwareService = require('./db-aware-service');

class CustomerLocationService extends DbAwareService {
    /**
     * Get location ID for the given customer ID.
     * @param {int} customerId - The customer's ID.
     * @return {Promise} A Promise which resolves to the customer's location ID.
     * @throws {Error} Throws exception if no customer found with the given ID.
     */
    getLocation(customerId) {
        // First try to get the customer using the provided ID
        return this.connection.then((db) => (
            db.collection('customers').findOne({ customerId })
        )).then((customer) => {
            // Throw exception if invalid ID
            if (!customer) {
                const error = new Error('No customer found with the given ID');
                error.name = 'noCustomer';
                throw error;
            }

            // If valid customer found, return their location ID
            return customer.locationId;
        });
    }
}

module.exports = CustomerLocationService;
