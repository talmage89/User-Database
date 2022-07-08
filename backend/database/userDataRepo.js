const { MongoClient, ObjectID } = require('mongodb');

function userDataRepo() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'userData';

    function loadData(data) {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();

                const db = client.db(dbName);

                const results = await db.collection('users').insertMany(data);
                resolve(results);
                client.close();

            } catch (error) {
                reject(error);
            }
        })
    }

    return { loadData }
}

module.exports = userDataRepo();