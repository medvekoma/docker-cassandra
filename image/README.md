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
```
