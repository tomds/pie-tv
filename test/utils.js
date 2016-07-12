function setUpDb(service) {
    let db;

    return service.connection.then((result) => {
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
}

export default { setUpDb };
