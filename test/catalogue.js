import { expect } from 'chai';

import CatalogueService from '../server/catalogue';
import config from '../config.js';


const service = new CatalogueService(config.dbConnectionString);

describe('Catalogue', () => {
    describe('#getChannels()', () => {
        it('should return Liverpool and UK-wide channels for a Liverpool customer', () => (
            service.connection.then(() => (
                service.getChannels('liverpool')
            )).then((channels) => {
                const channelNames = channels.map((channel) => channel.name);
                return expect(channelNames).to.have.members([
                    'Liverpool TV',
                    'Pie News',
                    'Pie Sports News',
                ]);
            })
        ));

        it('should return London and UK-wide channels for a London customer', () => (
            service.connection.then(() => (
                service.getChannels('london')
            )).then((channels) => {
                const channelNames = channels.map((channel) => channel.name);
                return expect(channelNames).to.have.members([
                    'Arsenal TV',
                    'Chelsea TV',
                    'Pie News',
                    'Pie Sports News',
                ]);
            })
        ));

        it('should return only UK-wide channels for a non-Liverpool/London customer', () => (
            service.connection.then(() => (
                service.getChannels('manchester')
            )).then((channels) => {
                const channelNames = channels.map((channel) => channel.name);
                return expect(channelNames).to.have.members([
                    'Pie News',
                    'Pie Sports News',
                ]);
            })
        ));
    });
});
