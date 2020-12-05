requetes ={
       //1. L’occupation des 50 clients qui ont réalisés le plus de sales (client)
       r1 : [
        {
            $project: {
                number_transactions: { $size: { $ifNull: ["$value.sales", []] } },
                OCCUPATION: "$value.OCCUPATION",
            },
            },
            { $sort: { number_transactions: -1 } },
            { $limit: 50 },
        ],
    
      //2. L’éducation moyenne des clients qui ont répondu positivement aux mails (client)
      r2 :[
        { $match: { RESPONSE: "True" } },
        {
            $group: {
            _id: null,
            average_education_réponse_positives: { $avg: "$CUSTOMERS.EDUCATIONNUM" },
            },
        },
      ],

      //3. Information sur toutes les transactions qu'a fait un client avec ses informations personnelles (client)
      r3 :[{ $match: { _id: 0 } }
      ],

      //4. Age et revenu moyen des clients qui habitent dans chaque quartier (client + demog)
      r4 :[
        { $project: {
            average_age : {$avg : "$value.customers.age"},
            average_income : "$value.INCOME_K"}}
      ],

      //5. Nombre de clients qui ont répondu positivement au mail groupé par leur sexe (client)
      r5 :[
        {$match:{"RESPONSE":"True"}},
        {$group:{_id:"$CUSTOMERS.SEX","sum":{$sum:1}}}
      ],

      //6. Le niveau d’éducation moyen des personnes qui ont reçu le mail groupé par leur réponse positive ou négative (client)
      r6 :[
        { $group : {_id : "$RESPONSE", "average_education" : {$avg : "$CUSTOMERS.EDUCATIONNUM"} }}

      ],

      //7. Top 10 des clients qui ont le plus de transactions avec leurs réponses aux mails (client)
      r7 :[
        {
            $project: {
            Customer_ID: "$_id",
            number_transactions: { $size: {$ifNull: ["$value.sales", []]} },
            Response : "$value.RESPONSE",
            },
        },
        { $sort: { number_transactions: -1 } },
        { $limit: 10 },
      ],

      //8. Dans chaque quartier, revenu moyen des habitants et montant moyen des ventes réalisées (client + demog)
      r8 :[
        { $project: {
            average_sales_amount : {$avg : "$value.customers.avg_amount"},
            average_income : "$value.INCOME_K"}}
      ]
}


module.exports = requetes;
