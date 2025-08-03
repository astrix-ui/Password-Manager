const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working

dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passwordManager';

const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect()

// GET ALL PASSWORDS 
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords')
const findResult = await collection.find({}).toArray();
res.json(findResult)
})

// SAVE PASSWORDS 
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords')
const findResult = await collection.insertOne(password);
res.send({success: true, result: findResult})
})

// DELETE PASSWORD 
app.delete('/', async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne({ id });
  res.send({ success: true, result });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
