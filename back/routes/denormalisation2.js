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
mapMailing = function () {
  var values = {
    RESPONSE: this.RESPONSE,
    age: this.CUSTOMERS.age,
    SEX: this.CUSTOMERS.SEX,
    GEOID: this.CUSTOMERS.GEOID,
    EDUCATIONNUM: this.CUSTOMERS.EDUCATIONNUM,
    OCCUPATION: this.CUSTOMERS.OCCUPATION,
    MARITAL_STATUS : this.CUSTOMERS.MARITAL_STATUS,
    NOM1 : this.CUSTOMERS.NOM1,
    NOM2 : this.CUSTOMERS.NOM2,
    NOM3 : this.CUSTOMERS.NOM3,
  };
  emit(this.REFID, values);
};
mapSales = function () {
  var values = { EVENTID: this.EVENTID, AMOUNT: this.AMOUNT };
  emit(this.REFID, values);
};
reduce2 = function (k, values) {
  var result = {},
    salesFields = {
      EVENTID: "",
      AMOUNT: "",
    };
  values.forEach(function (value) {
    var field;
    if ("EVENTID" in value) {
      if (!("sales" in result)) {
        result.sales = [];
      }
      result.sales.push(value);
    } else if ("sales" in value) {
      if (!("sales" in result)) {
        result.sales = [];
      }
      result.sales.push.apply(result.sales, value.sales);
    }
    for (field in value) {
      if (value.hasOwnProperty(field) && !(field in salesFields)) {
        result[field] = value[field];
      }
    }
  });
  return result;
};
mapMailing2 = function () {
  let arr =
    this.value.sales != null ? this.value.sales.map((x) => x["AMOUNT"]) : [];
  let avg = 0;
  for (let i = 0; i < arr.length; i++) {
    avg += arr[i];
  }
  var values = { avg_amount: avg, Customer_ID: this._id, age: this.value.age };
  emit(this.value.GEOID, values);
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
    await db.collection('mailings').mapReduce(mapMailing, reduce2, {out: { reduce: "sales_in_mailings" },});
    await db.collection('sales').mapReduce(mapSales, reduce2, { out: { reduce: "sales_in_mailings" } });
    //await db.collection('sales_in_mailings').mapReduce(mapMailing2, reduce, {out: { reduce: "results" },});
    //await db.collection('demog').mapReduce(mapDemog, reduce, { out: { reduce: "results" } });
    var end = new Date() - start
    return end
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
avg = await get_array("results",requetes_sol2.r4,db)
map_reduce = await execute_mapReduce(db)
avg = avg + map_reduce
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
avg = await get_array("results",requetes_sol2.r8,db)
console.log(avg)
map_reduce = await execute_mapReduce(db)
avg = avg + map_reduce
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
    db.collection('results').aggregate(requetes_sol2.r4).toArray()
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
    db.collection('results').aggregate(requetes_sol2.r8).toArray()
      .then(results => {
      res.send(results)
      })
    
});
router.get('/mapreduce',async function(req, res) {
  const db = req.app.locals.db2;
  try {
    res.send("on est en train")
    console.log("ca arrive")
    end = await execute_mapReduce(db);
    console.log("end")
    console.log(end)
    //res.send(JSON.stringify({"map reduce executed in : ":end}));
  } catch (error) {
    console.log(error)
    res.send("Map reduce not executed")
  }

  
});
module.exports = router;