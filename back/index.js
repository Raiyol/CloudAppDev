const express = require('express');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res)=>{
    res.json({test : 'hello'});
});


console.log('listening on port ', port);
app.listen(port);
