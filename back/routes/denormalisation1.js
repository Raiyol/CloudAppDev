//routes.js
const express = require('express');
const router = express.Router()
const requetes_sol1 = require("../requetes/solution1");


//set response for each endpoints
router.get('/query1', function(req, res) {
    const db = req.app.locals.db;
    db.collection('Customers').aggregate(requetes_sol1.r1).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query2', function(req, res) {
    const db = req.app.locals.db;
    db.collection('Customers').aggregate(requetes_sol1.r2).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query3', function(req, res) {
    const db = req.app.locals.db;
    db.collection('Customers').aggregate(requetes_sol1.r3).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query4', function(req, res) {
    const db = req.app.locals.db;
    db.collection('Customers').aggregate(requetes_sol1.r4).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query5', function(req, res) {
    const db = req.app.locals.db;
    db.collection('Customers').aggregate(requetes_sol1.r5).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query6', function(req, res) {
    const db = req.app.locals.db;
    db.collection('Customers').aggregate(requetes_sol1.r6).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query7', function(req, res) {
    const db = req.app.locals.db;
    db.collection('Customers').aggregate(requetes_sol1.r7).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query8', function(req, res) {
    const db = req.app.locals.db;
    db.collection('Customers').aggregate(requetes_sol1.r8).toArray()
      .then(results => {
      res.send(results)
      })
    
});

module.exports = router;