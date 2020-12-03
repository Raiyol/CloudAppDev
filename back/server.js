const express = require('express')
const app = express()
const { MongoClient } = require("mongodb");
require("dotenv/config")

//Import routes
const denormalisation1 = require("./routes/denormalisation1");
const denormalisation2 = require("./routes/denormalisation2");


app.use('/denormalisation1',denormalisation1)
app.use('/denormalisation2',denormalisation2)


//routes
app.get("/",(req,res) => {
  res.send('we are on home');
})

//connect to the database
connectionString = process.env.mongodb186
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('database')
    app.locals.db = db;
    const db2 = client.db('database2')
    app.locals.db2 = db2;
    
    //start listening to the server
    port = 8080
    app.listen(port, () => console.log(`Listening on port ${port}`));

  })
  .catch(error => console.error(error))




