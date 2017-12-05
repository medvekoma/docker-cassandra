-- keyspace is like a database
CREATE KEYSPACE nobel WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 2};

-- switch to the newly created keyspace
USE nobel;

-- Field year is partition key, laureateid is clustering key
CREATE TABLE laureates
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

-- Cassandra can only query by key or by indexed field
CREATE INDEX ON laureates (borncountrycode);

-- Populate table from a csv file
COPY laureates (year, category, laureateid, firstname, surname, borncountrycode, borncity) 
FROM '/demo/nobel-laureates.csv';

