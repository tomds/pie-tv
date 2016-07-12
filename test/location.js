import { expect } from 'chai';

import CustomerLocationService from '../server/location';
// import { setUpDb } from './utils';


const service = new CustomerLocationService('mongodb://localhost/pietv-test');

describe('Location', () => {
    // beforeEach(() => (setUpDb(service)));

    describe('#getLocation()', () => {
        it('should return the right location for the given user', () => (
            service.connection.then(() => (
                service.getLocation(1)
            )).then((location) => (
                expect(location).to.equal('london')
            ))
        ));
    });
});
