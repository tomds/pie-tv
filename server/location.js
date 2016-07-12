const DbAwareService = require('./db-aware-service');

class CustomerLocationService extends DbAwareService {
    /**
     * Get location ID for the given customer ID.
     * @param {int} customerId - The customer's ID.
     * @return {Promise} A Promise which resolves to the customer's location ID.
     * @throws {Error} Throws exception if no customer found with the given ID.
     */
    getLocation(customerId) {
        return this.connection.then((db) => (
            db.collection('customers').findOne({ customerId })
        )).then((customer) => {
            if (!customer) {
                const error = new Error('No customer found with the given ID');
                error.name = 'noCustomer';
                throw error;
            }

            return customer.locationId;
        });
    }
}

module.exports = CustomerLocationService;
