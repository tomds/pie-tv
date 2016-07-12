import { expect } from 'chai';
import sinon from 'sinon';

import Server from '../server/server';
import { setUpDb } from './utils';


const server = new Server('mongodb://localhost/pietv-test');

describe('GetCustomers', () => {
    beforeEach(() => setUpDb(server));

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
    beforeEach(() => setUpDb(server));

    describe('#login()', () => {
        const res = { cookie: sinon.spy() };
        const login = server.login(1, res);

        it('should set two cookies', () => (
            login.then(() => (
                expect(res.cookie.callCount).to.equal(2)
            ))
        ));
        it('should get a customer ID of 1', () => (
            login.then((customer) => (
                expect(customer.customerId).to.equal(1)
            ))
        ));
        it('should get a customer name of "London Customer"', () => (
            login.then((customer) => (
                expect(customer.name).to.equal('London Customer')
            ))
        ));
    });
});
