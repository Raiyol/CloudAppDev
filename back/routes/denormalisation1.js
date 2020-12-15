//routes.js
const express = require('express');
const router = express.Router()
//const requetes_sol = require("../requetes/solution1");
//const requetes_sol1 = requetes_sol.requetes

const function_requetes = require("../requetes/solution1");

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
mapCustomers = function () {
  let arr = this.sales.map((x) => x["AMOUNT"]);
  let avg = 0;
  for (let i = 0; i < arr.length; i++) {
    avg += arr[i];
  }
  var values = { avg_amount: avg, Customer_ID: this.ID, age: this.age };
  emit(this.GEOID, values);
};
mapDemog = function () {
  var values = { INCOME_K: this.INCOME_K };
  emit(this.GEOID, values);
};
reduce = function (k, values) {
  var result = {},
    clientFields = {
      avg_amount: "",
      Customer_ID: "",
      age: "",
    };
  values.forEach(function (value) {
    var field;
    if ("Customer_ID" in value) {
      if (!("customers" in result)) {
        result.customers = [];
      }
      result.customers.push(value);
    } else if ("customers" in value) {
      if (!("customers" in result)) {
        result.customers = [];
      }
      result.customers.push.apply(result.customers, value.customers);
    }
    for (field in value) {
      if (value.hasOwnProperty(field) && !(field in clientFields)) {
        result[field] = value[field];
      }
    }
  });
  return result;
};
async function execute_mapReduce(db){
  var start = new Date()
    await db.collection('Customers').mapReduce(mapCustomers, reduce, { out: { reduce: "results" } });
    await db.collection('Demog').mapReduce(mapDemog, reduce, { out: { reduce: "results" } });
    var end = new Date() - start
    return end
}


//set response for each endpoints
//---------------------------------------------------------------------------------
router.get('/query1/perf', async function(req, res) {
    const db = req.app.locals.db;
    var change_query = {}
    requetes_sol1 = function_requetes(change_query)
    avg = await get_array("Customers",requetes_sol1.r1,db)
    console.log(avg)
    res.send(JSON.stringify({"query1":avg}));
});
router.get('/query2/perf', async function(req, res) {
  const db = req.app.locals.db;
  var change_query = {}
  requetes_sol1 = function_requetes(change_query)
  avg = await get_array("Customers",requetes_sol1.r2,db)
  console.log(avg)
  res.send(JSON.stringify({"query2":avg}));
});
router.get('/query3/perf', async function(req, res) {
  const db = req.app.locals.db;
  var change_query = {}
  requetes_sol1 = function_requetes(change_query)
  avg = await get_array("Customers",requetes_sol1.r3,db)
  console.log(avg)
  res.send(JSON.stringify({"query3":avg}));
});
router.get('/query4/perf', async function(req, res) {
  const db = req.app.locals.db;
  var change_query = {}
  requetes_sol1 = function_requetes(change_query)
  avg = await get_array("results",requetes_sol1.r4,db)
  map_reduce = await execute_mapReduce(db)
  avg = avg + map_reduce
  console.log(avg)
  res.send(JSON.stringify({"query4":avg}));
});
router.get('/query5/perf', async function(req, res) {
  const db = req.app.locals.db;
  var change_query = {}
  requetes_sol1 = function_requetes(change_query)
  avg = await get_array("Customers",requetes_sol1.r5,db)
  console.log(avg)
  res.send(JSON.stringify({"query5":avg}));
});
router.get('/query6/perf', async function(req, res) {
  const db = req.app.locals.db;
  var change_query = {}
  requetes_sol1 = function_requetes(change_query)
  avg = await get_array("Customers",requetes_sol1.r6,db)
  console.log(avg)
  res.send(JSON.stringify({"query6":avg}));
});
router.get('/query7/perf', async function(req, res) {
  const db = req.app.locals.db;
  var change_query = {}
  requetes_sol1 = function_requetes(change_query)
  avg = await get_array("Customers",requetes_sol1.r7,db)
  console.log(avg)
  res.send(JSON.stringify({"query7":avg}));
});
router.get('/query8/perf', async function(req, res) {
  const db = req.app.locals.db;
  var change_query = {}
  requetes_sol1 = function_requetes(change_query)
  avg = await get_array("results",requetes_sol1.r8,db)
  map_reduce = await execute_mapReduce(db)
  avg = avg + map_reduce
  console.log(avg)
  res.send(JSON.stringify({"query8":avg}));
});

//---------------------------------------------------------------------------------
router.get('/query1', function(req, res) {

    const db = req.app.locals.db;
    var change_query = {}
    requetes_sol1 = function_requetes(change_query)
    db.collection('Customers').aggregate(requetes_sol1.r1).toArray()
      .then(results => {
      res.send(results)
      })
    
});
router.get('/query2', function(req, res) {
    const db = req.app.locals.db;

    var change_query = {}
    requetes_sol1 = function_requetes(change_query)
    console.log(requetes_sol1.r2)
    db.collection('Customers').aggregate(requetes_sol1.r2).toArray()
      .then(results => {
      res.send(results)
      })
    
});
router.get('/query2_2', function(req, res) {
  const db = req.app.locals.db;

  var change_query = {}
  change_query['query2'] = "False"
  requetes_sol1 = function_requetes(change_query)
  console.log(requetes_sol1.r2)
  db.collection('Customers').aggregate(requetes_sol1.r2).toArray()
    .then(results => {
    res.send(results)
    })
  
});
router.get('/query3', function(req, res) {
    
    const db = req.app.locals.db;
    id = req.query.id;
    var change_query = {}
    if (id){
      console.log(id)
      change_query['query3'] = Number(id)
    }
    requetes_sol1 = function_requetes(change_query)
    console.log(requetes_sol1.r3)
    db.collection('Customers').aggregate(requetes_sol1.r3).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/query4',async function(req, res) {
    const db = req.app.locals.db;
    var change_query = {}
    requetes_sol1 = function_requetes(change_query)
    db.collection('results').aggregate(requetes_sol1.r4).toArray()
      .then(results => {
      res.send(results)
      })
    
});
router.get('/query5', function(req, res) {
    const db = req.app.locals.db;
    var change_query = {}
    requetes_sol1 = function_requetes(change_query)
    db.collection('Customers').aggregate(requetes_sol1.r5).toArray()
      .then(results => {
      res.send(results)
      })
    
});
router.get('/query5_2', function(req, res) {
  const db = req.app.locals.db;
  var change_query = {}
  change_query['query5'] = "False"
  requetes_sol1 = function_requetes(change_query)
  db.collection('Customers').aggregate(requetes_sol1.r5).toArray()
    .then(results => {
    res.send(results)
    })
  
});
router.get('/query6', function(req, res) {
    const db = req.app.locals.db;
    var change_query = {}
    requetes_sol1 = function_requetes(change_query)
    db.collection('Customers').aggregate(requetes_sol1.r6).toArray()
      .then(results => {
      res.send(results)
      })
    
});
router.get('/query7', function(req, res) {
    const db = req.app.locals.db;
    var change_query = {}
    requetes_sol1 = function_requetes(change_query)
    db.collection('Customers').aggregate(requetes_sol1.r7).toArray()
      .then(results => {
      res.send(results)
      })
    
});
router.get('/query8', function(req, res) {
    const db = req.app.locals.db;
    var change_query = {}
    requetes_sol1 = function_requetes(change_query)
    db.collection('results').aggregate(requetes_sol1.r8).toArray()
      .then(results => {
      res.send(results)
      })
    
});

router.get('/mapreduce',async function(req, res) {
  const db = req.app.locals.db;
  try {
    end = await execute_mapReduce(db);
    res.send(JSON.stringify({"map reduce executed in : ":end}));
  } catch (error) {
    console.log(error)
    res.send("Map reduce not executed")
  }

  
});
router.get('/administrateur',async function(req, res) {
  const db = req.app.locals.db;
  try {
    const result = await db.command({
      dbStats: 1,
    });
    //const statistiques = JSON.parse(result)
    //console.log(result)
    /*var stats = {}
    for (shard in result.raw){
      stats["shard"] = shard
      //console.log(shard)
      //console.log("-------------")
    }
    console.log(stats)*/
    res.send(JSON.stringify(result));
  } catch (error) {
    console.log(error)
    res.send("status not available")
  }

  
});


module.exports = router;