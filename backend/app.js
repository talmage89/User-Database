const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const userDataRepo = require('./database/userDataRepo');
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'userData';
const port = 3000;
const originalUsers = require('./data.json');

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/home', async (req, res) => {
    const client = new MongoClient(dbUrl);
    await client.connect();
    try {
        const data = await userDataRepo.getUsers();
        res.send(data);
    } catch (error) {
        console.log(error)
    }
})

app.post('/', async (req, res) => {
    const client = new MongoClient(dbUrl);
    await client.connect();
        try {
            const userToAdd = {
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email,
                "age": req.body.age.toString()
            };
            let users = await userDataRepo.getUsers();

            // if email is already in database
            if (users.find(el => el.email === userToAdd.email)) {
                await userDataRepo.addUser(userToAdd)
                res.status(200).send();

                // otherwise mark the res with an unknown email status
            } else res.status(202).send();
        } catch (error) {
            console.log(error);
        }
});

app.listen(port, async () => {
    const client = new MongoClient(dbUrl);
    await client.connect();
    try {
        await client.db(dbName).dropDatabase();
        await userDataRepo.loadData(originalUsers);
        console.log(`server started on port ${port}, db created and populated`);
    } catch (error) {
        console.log(error);
    }
})