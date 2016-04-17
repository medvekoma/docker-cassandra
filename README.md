# docker-cassandra

Step-by-step guide to run a Cassandra cluster on Docker in minutes.

## 1. Use the official image

```bash
## start the first node
docker run --name node1 -d cassandra

## start the second node and link it to the first
docker run --name node2 -d --link node1:cassandra cassandra

## test cluster formation
docker exec -it node1 nodetool status

## start the third node
docker run --name node3 -d --link node1:cassandra cassandra
```

## 1. Create your own Cassandra image

## 1. Use docker-compose
