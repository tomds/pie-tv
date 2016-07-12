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

        it('should raise an exception for an invalid customer ID', () => {
            let exceptionsRaised = 0;

            return service.connection.then(() => (
                service.getLocation(6)
            )).catch((exception) => {
                exceptionsRaised++;
                return expect(exception.name).to.equal('noCustomer');
            }).then(() => (
                expect(exceptionsRaised).to.equal(1)
            ));
        });
    });
});
