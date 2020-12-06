function test_queries(change_query){
  console.log('ici')
  console.log(change_query)
  if (change_query["query2"] == null){
    change_query["query2"] = "True"
  }
  if (change_query["query3"] == null){
    change_query["query3"] = 0
  }
  if (change_query["query5"] == null){
    change_query["query5"] = "True"
  }
  requetes ={
    //1. L’occupation des 50 clients qui ont réalisés le plus de sales (client)
    r1 : [
        { $project: { number_transactions: { $size: "$sales" }, OCCUPATION: 1 } },
        { $sort: { number_transactions: -1 } },
        { $limit: 50 },
        ],
    
    //2. L’éducation moyenne des clients qui ont répondu positivement aux mails (client)
    r2 :[
      { $match: { "mailings.RESPONSE": change_query["query2"] } },
      {
          $group: {
          _id: null,
          average_education_réponse_positives: { $avg: "$EDUCATIONNUM" },
          },
      },
      ],

      //3. Information sur toutes les transactions qu'a fait un client avec ses informations personnelles (client)
      r3 :[{ $match: { ID: change_query["query3"] } }
      ],

      //4. Age et revenu moyen des clients qui habitent dans chaque quartier (client + demog)
      r4 :[
        { $project: {
        average_age : {$avg : "$value.customers.age"},
        average_income : "$value.INCOME_K"}
      }
      ],

      //5. Nombre de clients qui ont répondu positivement au mail groupé par leur sexe (client)
      r5 :[
        { $match: { "mailings.RESPONSE": change_query["query5"] } },
        { $group: { _id: "$SEX", sum: { $sum: 1 } } },
      ],

      //6. Le niveau d’éducation moyen des personnes qui ont reçu le mail groupé par leur réponse positive ou négative (client)
      r6 :[
        { $unwind: "$mailings" },
        {
            $group: {
            _id: "$mailings.RESPONSE",
            average_education: { $avg: "$EDUCATIONNUM" },
            },
        },
      ],

      //7. Top 10 des clients qui ont le plus de transactions avec leurs réponses aux mails (client)
      r7 :[{
        $project: {
        Customer_ID: "$ID",
        number_transactions: { $size: "$sales" },
        "mailings.RESPONSE": 1,
        },
      },
      { $sort: { number_transactions: -1 } },
      { $limit: 10 }
      ],

      //8. Dans chaque quartier, revenu moyen des habitants et montant moyen des ventes réalisées (client + demog)
      r8 :[{ $project: {
        average_sales_amount : {$avg : "$value.customers.avg_amount"},
        average_income : "$value.INCOME_K"}}
      ]
}

return requetes
}

requetes ={
    //1. L’occupation des 50 clients qui ont réalisés le plus de sales (client)
    r1 : [
        { $project: { number_transactions: { $size: "$sales" }, OCCUPATION: 1 } },
        { $sort: { number_transactions: -1 } },
        { $limit: 50 },
        ],
    
    //2. L’éducation moyenne des clients qui ont répondu positivement aux mails (client)
    r2 :[
      { $match: { "mailings.RESPONSE": "True" } },
      {
          $group: {
          _id: null,
          average_education_réponse_positives: { $avg: "$EDUCATIONNUM" },
          },
      },
      ],

      //3. Information sur toutes les transactions qu'a fait un client avec ses informations personnelles (client)
      r3 :[{ $match: { ID: 0 } }
      ],

      //4. Age et revenu moyen des clients qui habitent dans chaque quartier (client + demog)
      r4 :[
        { $project: {
        average_age : {$avg : "$value.customers.age"},
        average_income : "$value.INCOME_K"}
      }
      ],

      //5. Nombre de clients qui ont répondu positivement au mail groupé par leur sexe (client)
      r5 :[
        { $match: { "mailings.RESPONSE": "True" } },
        { $group: { _id: "$SEX", sum: { $sum: 1 } } },
      ],

      //6. Le niveau d’éducation moyen des personnes qui ont reçu le mail groupé par leur réponse positive ou négative (client)
      r6 :[
        { $unwind: "$mailings" },
        {
            $group: {
            _id: "$mailings.RESPONSE",
            average_education: { $avg: "$EDUCATIONNUM" },
            },
        },
      ],

      //7. Top 10 des clients qui ont le plus de transactions avec leurs réponses aux mails (client)
      r7 :[{
        $project: {
        Customer_ID: "$ID",
        number_transactions: { $size: "$sales" },
        "mailings.RESPONSE": 1,
        },
      },
      { $sort: { number_transactions: -1 } },
      { $limit: 10 }
      ],

      //8. Dans chaque quartier, revenu moyen des habitants et montant moyen des ventes réalisées (client + demog)
      r8 :[{ $project: {
        average_sales_amount : {$avg : "$value.customers.avg_amount"},
        average_income : "$value.INCOME_K"}}
      ]
}

//module.exports = test_queries;
module.exports = test_queries;
exports.requetes = requetes;

//r2 true ou false
//r3 changer id
//r5 True ou false
//