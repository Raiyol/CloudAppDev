//routes.js
const express = require('express');
const router = express.Router()
const requetes_sol2 = require("../requetes/solution2");


//set response for each endpoints
router.get('/query1', function(req, res) {
    const db = req.app.locals.db2;
    db.collection('sales_in_mailings').aggregate(requetes_sol2.r1).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query2', function(req, res) {
    const db = req.app.locals.db2;
    db.collection('mailings').aggregate(requetes_sol2.r2).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query3', function(req, res) {
    const db = req.app.locals.db2;
    db.collection('sales_in_mailings').aggregate(requetes_sol2.r3).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query4', function(req, res) {
    const db = req.app.locals.db2;
    db.collection('sales_in_mailings').aggregate(requetes_sol2.r4).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query5', function(req, res) {
    const db = req.app.locals.db2;
    db.collection('mailings').aggregate(requetes_sol2.r5).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query6', function(req, res) {
    const db = req.app.locals.db2;
    db.collection('mailings').aggregate(requetes_sol2.r6).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query7', function(req, res) {
    const db = req.app.locals.db2;
    db.collection('sales_in_mailings').aggregate(requetes_sol2.r7).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query8', function(req, res) {
    const db = req.app.locals.db2;
    db.collection('sales_in_mailings').aggregate(requetes_sol2.r8).toArray()
      .then(results => {
      res.send(results)
      })
    
});

module.exports = router;