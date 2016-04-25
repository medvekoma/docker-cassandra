# Demo Cassandra image

Adds an example dataset and some tooling to the official Cassandra image

## Create image

```bash
docker build -t medvekoma/cassandra-demo .
docker push medvekoma/cassandra-demo
```

## Example CQL scripts

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

COPY nobel_laureates (year, category, laureateid, firstname, surname, borncountrycode, borncity) 
FROM '/demo/nobel-laureates.csv';

SELECT * FROM nobel_laureates LIMIT 10;
SELECT * FROM nobel_laureates WHERE year = 2010;
SELECT * FROM nobel_laureates WHERE borncountrycode = 'HU';
CREATE INDEX ON nobel_laureates (borncountrycode);
SELECT * FROM nobel_laureates WHERE borncountrycode='RU' AND category='physics';
SELECT * FROM nobel_laureates WHERE borncountrycode='RU' AND category='physics' ALLOW FILTERING;
```
