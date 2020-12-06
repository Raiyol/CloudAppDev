#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import json


# In[2]:


customers =pd.read_csv(r"C:\Users\Hugo TENG\OneDrive - De Vinci\ESILV\année_5\dev appli cloud\data tp\customers.csv")


# In[3]:


mailings =pd.read_json(r"C:\Users\Hugo TENG\OneDrive - De Vinci\ESILV\année_5\dev appli cloud\data tp\mailings.json")


# In[54]:


sales =pd.read_json(r"C:\Users\Hugo TENG\OneDrive - De Vinci\ESILV\année_5\dev appli cloud\data tp\sales.json")


# In[5]:


demog =pd.read_csv(r"C:\Users\Hugo TENG\OneDrive - De Vinci\ESILV\année_5\dev appli cloud\data tp\demog.csv")


# In[55]:


mailings_list = mailings.values.tolist()
customers_list = customers.values.tolist()
demog_list = demog.values.tolist()
sales_list = sales.values.tolist()


# In[105]:


#création du string mailings_and_sales_in_customers qui deviendra un json
mailings_and_sales_in_customers = "["
k=0
size=len(customers)
size_sales=len(sales)


for i in range(size):
    mailings_and_sales_in_customers+='{"ID":'+str(customers_list[i][0])+',"SEX":"'+str(customers_list[i][1])+'","MARITAL_STATUS":"'+str(customers_list[i][2])+'","GEOID":'+str(customers_list[i][3])+',"EDUCATIONNUM":'+str(customers_list[i][4])+',"OCCUPATION":"'+str(customers_list[i][5])+'","DATA1":'+str(customers_list[i][6])+',"DATA2":'+str(customers_list[i][7])+',"DATA3":'+str(customers_list[i][8])+',"NOM1":"'+str(customers_list[i][9])+'","NOM2":"'+str(customers_list[i][10])+'","NOM3":"'+str(customers_list[i][11])+'","age":'+str(customers_list[i][12])
    mailings_and_sales_in_customers+=',"mailings":[{"KxIndex":'+str(mailings_list[i][1])+',"REF_DATE":"'+str(mailings_list[i][2])+'","RESPONSE":"'+str(mailings_list[i][3])+'"}],'
    mailings_and_sales_in_customers+='"sales":['
    
    #on ajoute les sales du customer
    if sales_list[k][1]==i:
        while sales_list[k][1]==i:
            mailings_and_sales_in_customers+='{"EVENTID":'+str(sales_list[k][0])+',"EVENT_DATE":"'+str(sales_list[k][2])+'","AMOUNT":'+str(sales_list[k][3])+'}'
            k+=1
            if k==size_sales:
                break
            if sales_list[k][1]==i:
                mailings_and_sales_in_customers+=','
        
    #on clot le customer i        
    mailings_and_sales_in_customers+=']},'
    
#remove last ','
mailings_and_sales_in_customers=mailings_and_sales_in_customers[:-1]
#clot le json
mailings_and_sales_in_customers += "]"


# In[43]:


f = open(r'C:\Users\Hugo TENG\OneDrive - De Vinci\ESILV\année_5\dev appli cloud\data tp\mailings_and_sales_in_customers.txt', "w")
f.write(mailings_and_sales_in_customers)
f.close()


# In[77]:


#for 230000 to end
f = open(r'C:\Users\Hugo TENG\OneDrive - De Vinci\ESILV\année_5\dev appli cloud\data tp\mailings_and_sales_in_customers_230000_to_end.txt', "w")
f.write(mailings_and_sales_in_customers)
f.close()


# In[19]:


#création du string customers_in_mailings qui deviendra un json
customers_in_mailings = "["
k=0
size=len(customers)


for i in range(size):
    customers_in_mailings+='{"REFID":'+str(mailings_list[i][0])+',"KxIndex":'+str(mailings_list[i][1])+',"REF_DATE":"'+str(mailings_list[i][2])+'","RESPONSE":"'+str(mailings_list[i][3])+'",'
    customers_in_mailings+='"CUSTOMERS":{"ID":'+str(customers_list[i][0])+',"SEX":"'+str(customers_list[i][1])+'","MARITAL_STATUS":"'+str(customers_list[i][2])+'","GEOID":'+str(customers_list[i][3])+',"EDUCATIONNUM":'+str(customers_list[i][4])+',"OCCUPATION":"'+str(customers_list[i][5])+'","DATA1":'+str(customers_list[i][6])+',"DATA2":'+str(customers_list[i][7])+',"DATA3":'+str(customers_list[i][8])+',"NOM1":"'+str(customers_list[i][9])+'","NOM2":"'+str(customers_list[i][10])+'","NOM3":"'+str(customers_list[i][11])+'","age":'+str(customers_list[i][12])+'}},'
    
    
#remove last ','
customers_in_mailings=customers_in_mailings[:-1]
#clot le json
customers_in_mailings += "]"


# In[23]:


f = open(r'C:\Users\Hugo TENG\OneDrive - De Vinci\ESILV\année_5\dev appli cloud\data tp\customers_in_mailings.txt', "w")
f.write(customers_in_mailings)
f.close()

