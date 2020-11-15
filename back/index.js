const express = require('express')
const app = express()

port = 3000;

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => console.log(`Listening on port ${port}`));