const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const userDataRepo = require('./database/userDataRepo');
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'userData';
const port = 3000;

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/home', (req, res) => {
    console.log('get request got');
})

app.post('/', async (req, res) => {
    console.log("got a post")
    console.log(req.body);
    
    const client = new MongoClient(dbUrl);
    await client.connect();
    try {
        const data = [
            {"Username": "Talmage"},
            {"Username": "Mindy"},
            {"Username": "Camille"}
        ]
        await userDataRepo.loadData(data);
    } catch (error) {
        console.log(error);
    } finally {
        await client.db(dbName).dropDatabase();
        const admin = client.db(dbName).admin();
        console.log(await admin.listDatabases());
        client.close();
        res.send('Your moms')
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})