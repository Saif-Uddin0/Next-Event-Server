const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require("dotenv").config()
// middleware
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running fine!')
})








const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@firstproject.7bzasho.mongodb.net/?appName=firstProject`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();

    const db = client.db('events-db');
    const eventCollection = db.collection('events');

    app.get('/events', async (req, res) => {
      const result = await eventCollection.find().toArray()
      res.send(result)
    })

    app.get('/events/:id', async (req, res) => {
      const { id } = req.params
      const result = await eventCollection.findOne({ _id: new ObjectId(id) })
      res.send(result);
    })

    // to add data to db
    app.post('/events', async (req, res) => {
      const data = req.body;
      const result = await eventCollection.insertOne(data)
      res.send({
        success: true,
        result
      })
    })
    app.delete('/events/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await eventCollection.deleteOne(query)
      res.send(result)
    })



    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {



  }
}
run().catch(console.dir);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})