const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running fine!')
})








const uri = "mongodb+srv://event-db:TBgH7NxnJCuEfIgz@firstproject.7bzasho.mongodb.net/?appName=firstProject";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const db = client.db('events-db');
    const eventCollection = db.collection('events');

    app.get('/events' , async(req, res)=>{
      const result = await eventCollection.find().toArray()
      res.send(result)
    })




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    


  }
}
run().catch(console.dir);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})