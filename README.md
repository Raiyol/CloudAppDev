# CloudAppDev

> Rendu final cours Developement d'Application Cloud

## Denormalisation 1

Requêtes mongodb :

1. L’occupation des 50 clients qui ont réalisés le plus de sales (client):

   ```text
   db.Customers.aggregate([
   { $project: { number_transactions: { $size: "$sales" }, OCCUPATION: 1 } },
   { $sort: { number_transaction: -1 } },
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
