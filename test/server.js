import { expect } from 'chai';
import sinon from 'sinon';

import Server from '../server/server';


const server = new Server('mongodb://localhost/pietv');

describe('GetCustomers', () => {
    describe('#getCustomers()', () => {
        it('should return the right number of customers from the dB', () => (
            server.connection.then(() => (
                server.getCustomers()
            )).then((customers) => (
                expect(customers.length).to.equal(3)
            ))
        ));
    });
});

describe('Login', () => {
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

describe('Checkout', () => {
    describe('#getSelectedChannels', () => {
        const req = {
            body: {
                selectedChannels: '["Sky News", "Arsenal TV"]',
            },
        };

        it('should return an array of the selected channels', () => (
            expect(server.getSelectedChannels(req)).to.have.members([
                'Sky News',
                'Arsenal TV',
            ])
        ));
    });
});
