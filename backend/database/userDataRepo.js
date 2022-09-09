const { MongoClient } = require('mongodb');

function userDataRepo() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'userData';
    const collectionName = 'users';

    function loadData(data) {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);
                let results = await db.collection(collectionName).insertMany(data);
                resolve(results);
                client.close();
            } catch (error) {
                reject(error);
            }
        })
    }

    function getUsers(query) {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);
                let items = await db.collection(collectionName).find(query).toArray();
                resolve(items);
                client.close()
            } catch (error) {
                reject(error);
            }
        })
    }

    function addUser(user) {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);
                const results = await db.collection(collectionName).insertOne(user)
                resolve(results);
                client.close();
            } catch (error) {
                reject(error);
            }
        })
    }

    return { loadData, addUser, getUsers }
}
module.exports = userDataRepo();