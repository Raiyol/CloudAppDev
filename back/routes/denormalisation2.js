//routes.js
const express = require('express');
const router = express.Router()
const requetes_sol2 = require("../requetes/solution2");


async function get_array(name_collection,requete,db){

  var array = [];
    for (i =0; i < 10; i++){
        var start = new Date()
        await db.collection(name_collection).aggregate(requete).toArray()
        var end = new Date() - start
        array.push(end)
    }
    array = modify_array(array);
    //console.log(array)
    var total =0
    for(var i = 0; i < array.length; i++) {total += array[i];}
    var avg = total / array.length;
    return avg
}
function modify_array(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;
  var min = arr[0];
  var minIndex = 0;


  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
      if (arr[i] < min) {
        minIndex = i;
        min = arr[i];
    }
  }
  arr.splice(minIndex, 1)
  arr.splice(maxIndex, 1)
  return arr
}

//set response for each endpoints
//---------------------------------------------------------------------------------
router.get('/query1/perf', async function(req, res) {
  const db = req.app.locals.db2;
  avg = await get_array("sales_in_mailings",requetes_sol2.r1,db)
  console.log(avg)
  res.send(JSON.stringify({"query1":avg}));
});
router.get('/query2/perf', async function(req, res) {
const db = req.app.locals.db2;
avg = await get_array("mailings",requetes_sol2.r2,db)
console.log(avg)
res.send(JSON.stringify({"query2":avg}));
});
router.get('/query3/perf', async function(req, res) {
const db = req.app.locals.db2;
avg = await get_array("sales_in_mailings",requetes_sol2.r3,db)
console.log(avg)
res.send(JSON.stringify({"query3":avg}));
});
router.get('/query4/perf', async function(req, res) {
const db = req.app.locals.db2;
avg = await get_array("sales_in_mailings",requetes_sol2.r4,db)
console.log(avg)
res.send(JSON.stringify({"query4":avg}));
});
router.get('/query5/perf', async function(req, res) {
const db = req.app.locals.db2;
avg = await get_array("mailings",requetes_sol2.r5,db)
console.log(avg)
res.send(JSON.stringify({"query5":avg}));
});
router.get('/query6/perf', async function(req, res) {
const db = req.app.locals.db2;
avg = await get_array("mailings",requetes_sol2.r6,db)
console.log(avg)
res.send(JSON.stringify({"query6":avg}));
});
router.get('/query7/perf', async function(req, res) {
const db = req.app.locals.db2;
avg = await get_array("sales_in_mailings",requetes_sol2.r7,db)
console.log(avg)
res.send(JSON.stringify({"query7":avg}));
});
router.get('/query8/perf', async function(req, res) {
const db = req.app.locals.db2;
avg = await get_array("sales_in_mailings",requetes_sol2.r8,db)
console.log(avg)
res.send(JSON.stringify({"query8":avg}));
});

//---------------------------------------------------------------------------------

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