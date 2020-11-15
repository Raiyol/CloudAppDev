# CloudAppDev

> Rendu final cours Developement d'Application Cloud

## Denormalisation 1

<details>

<summary>En premier, un Map Reduce qui nous permet de faire les requetes 4 et 8 :</summary>

```text
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

db.Customers.mapReduce(mapCustomers, reduce, { out: { reduce: "results" } });
db.Demog.mapReduce(mapDemog, reduce, { out: { reduce: "results" } });
```

</details>

Les requêtes mongodb :

1. L’occupation des 50 clients qui ont réalisés le plus de sales (client):

   ```text
   db.Customers.aggregate([
   { $project: { number_transactions: { $size: "$sales" }, OCCUPATION: 1 } },
   { $sort: { number_transactions: -1 } },
   { $limit: 50 },
   ]);
   ```

2. L’éducation moyenne des clients qui ont répondu positivement aux mails (client)

   ```text
   db.Customers.aggregate([
   { $match: { "mailings.RESPONSE": "True" } },
   {
       $group: {
       _id: null,
       average_education_réponse_positives: { $avg: "$EDUCATIONNUM" },
       },
   },
   ]);
   ```

3. Information sur toutes les transactions qu'a fait un client avec ses informations personnelles (client)

   ```text
   db.Customers.aggregate([{ $match: { ID: 0 } }]);
   ```

4. Age et revenu moyen des clients qui habitent dans chaque quartier (client + demog)

   ```text
   db.results.aggregate({ $project: {
   average_age : {$avg : "$value.customers.age"},
   average_income : "$value.INCOME_K"}});
   ```

5. Nombre de clients qui ont répondu positivement au mail groupé par leur sexe (client)

   ```text
   db.Customers.aggregate([
   { $match: { "mailings.RESPONSE": "True" } },
   { $group: { _id: "$SEX", sum: { $sum: 1 } } },
   ]);
   ```

6. Le niveau d’éducation moyen des personnes qui ont reçu le mail groupé par leur réponse positive ou négative (client)

   ```text
   db.Customers.aggregate([
   { $unwind: "$mailings" },
   {
       $group: {
       _id: "$mailings.RESPONSE",
       average_education: { $avg: "$EDUCATIONNUM" },
       },
   },
   ]);
   ```

7. Top 10 des clients qui ont le plus de transactions avec leurs réponses aux mails (client)

   ```text
   db.Customers.aggregate([
   {
       $project: {
       Customer_ID: "$ID",
       number_transactions: { $size: "$sales" },
       "mailings.RESPONSE": 1,
       },
   },
   { $sort: { number_transactions: -1 } },
   { $limit: 10 },
   ]);
   ```

8. Dans chaque quartier, revenu moyen des habitants et montant moyen des ventes réalisées (client + demog)

   ```text
   db.results.aggregate({ $project: {
   average_sales_amount : {$avg : "$value.customers.avg_amount"},
   average_income : "$value.INCOME_K"}});
   ```

## Denormalisation 2

<details>

<summary>En premier, deux Map Reduce qui nous permet de faire plusieurs requêtes :</summary>

```text
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

db.mailings.mapReduce(mapMailing, reduce2, {
  out: { reduce: "sales_in_mailings" },
});
db.sales.mapReduce(mapSales, reduce2, { out: { reduce: "sales_in_mailings" } });
```

```text
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

db.sales_in_mailings.mapReduce(mapMailing2, reduce, {
  out: { reduce: "results" },
});
db.demog.mapReduce(mapDemog, reduce, { out: { reduce: "results" } });
```

</details>

1. L’occupation des 50 clients qui ont réalisés le plus de sales (client):

   ```text
    db.sales_in_mailings.aggregate(
    [
        {
        $project: {
            number_transactions: { $size: { $ifNull: ["$value.sales", []] } },
            OCCUPATION: "$value.OCCUPATION",
        },
        },
        { $sort: { number_transactions: -1 } },
        { $limit: 50 },
    ],
    { allowDiskUse: true }
    );
   ```

2. L’éducation moyenne des clients qui ont répondu positivement aux mails (client)

   ```text
    db.mailings.aggregate([
    { $match: { RESPONSE: "True" } },
    {
        $group: {
        _id: null,
        average_education_réponse_positives: { $avg: "$CUSTOMERS.EDUCATIONNUM" },
        },
    },
    ]);
   ```

3. Information sur toutes les transactions qu'a fait un client avec ses informations personnelles (client)

   ```text
   db.sales_in_mailings.find({ _id: 0 });
   ```

4. Age et revenu moyen des clients qui habitent dans chaque quartier (client + demog)

   ```text
   db.results.aggregate({ $project: {
   average_age : {$avg : "$value.customers.age"},
   average_income : "$value.INCOME_K"}});
   ```

5. Nombre de clients qui ont répondu positivement au mail groupé par leur sexe (client)

   ```text
    db.mailings.aggregate([
    {$match:{"RESPONSE":"True"}},
    {$group:{_id:"CUSTOMERS.SEX","sum":{$sum:1}}}
    ]);
   ```

6. Le niveau d’éducation moyen des personnes qui ont reçu le mail groupé par leur réponse positive ou négative (client)

   ```text
    db.mailings.aggregate([
    { $group : {_id : "$RESPONSE", "average_education" : {$avg : "$CUSTOMERS.EDUCATIONNUM"} }}
    ]);
   ```

7. Top 10 des clients qui ont le plus de transactions avec leurs réponses aux mails (client)

   ```text
    db.sales_in_mailings.aggregate([
    {
        $project: {
        Customer_ID: "$_id",
        number_transactions: { $size: {$ifNull: ["$value.sales", []]} },
        Response : "$value.RESPONSE",
        },
    },
    { $sort: { number_transactions: -1 } },
    { $limit: 10 },
    ]);
   ```

8. Dans chaque quartier, revenu moyen des habitants et montant moyen des ventes réalisées (client + demog)

   ```text
   db.results.aggregate({ $project: {
   average_sales_amount : {$avg : "$value.customers.avg_amount"},
   average_income : "$value.INCOME_K"}});
   ```
