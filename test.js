import { expect } from 'chai';
import sinon from 'sinon';

import Server from './server/server';


const server = new Server('mongodb://localhost/pietv-test');

describe('GetCustomers', () => {
    beforeEach(() => {
        let db;

        return server.connection.then((result) => {
            db = result;
            return db.dropCollection('customers');
        }).then(() => (
            db.collection('customers').insertMany([
                {
                    customerId: 1,
                    name: 'London Customer',
                    locationId: 'london',
                },
                {
                    customerId: 2,
                    name: 'Liverpool Customer',
                    locationId: 'liverpool',
                },
                {
                    customerId: 3,
                    name: 'Manchester Customer',
                    locationId: 'manchester',
                },
                {
                    customerId: 4,
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
                expect(customers.length).to.equal(4)
            ))
        ));
    });
});

describe('login', () => {
    describe('#setCustomerCookie()', () => {
        it('should call the cookie method on the response object', () => {
            const res = { cookie: sinon.spy() };

            server.setCustomerCookie(1, res);
            expect(res.cookie.calledOnce).to.equal(true);
        });
    });
});
