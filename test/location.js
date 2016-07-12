import { expect } from 'chai';

import CustomerLocationService from '../server/location';


const service = new CustomerLocationService('mongodb://localhost/pietv');

describe('Location', () => {
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
