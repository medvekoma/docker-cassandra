# Demo Cassandra image

Adds an example dataset and some tooling to the official Cassandra image

## Create table

```SQL
CREATE TABLE nobel_laureates 
(
  year int, 
  category text, 
  laureateid int, 
  firstname text, 
  surname text, 
  borncountrycode text, 
  borncity text, 
  PRIMARY KEY (year, laureateid)
);

COPY nobel_laureates (year, category, laureateid, firstname, surname, borncountrycode, borncity) FROM 'nobel-laureates.csv';
```
