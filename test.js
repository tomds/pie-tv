import { assert } from 'chai';
import Server from './server/server';


describe('GetCustomers', () => {
    const server = new Server('mongodb://localhost/pietv-test');

    beforeEach(() => {
        let db;

        return server.connection.then((result) => {
            db = result;
            return db.dropCollection('customers');
        }).then(() => (
            db.collection('customers').insertMany([
                {
                    customerId: '1',
                    name: 'London Customer',
                    locationId: 'london',
                },
                {
                    customerId: '2',
                    name: 'Liverpool Customer',
                    locationId: 'liverpool',
                },
                {
                    customerId: '3',
                    name: 'Manchester Customer',
                    locationId: 'manchester',
                },
                {
                    customerId: '4',
                    name: 'York Customer',
                    locationId: 'york',
                },
            ])
        ));
    });

    describe('#getCustomers()', () => {
        it('should return the right number of customers from the dB', () => (
            server.connection.then(() => (
                server.getCustomers()
            )).then((customers) => (
                assert.equal(customers.length, 4)
            ))
        ));
    });
});
