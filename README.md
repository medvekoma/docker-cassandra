# docker-cassandra

Step-by-step guide to run a Cassandra cluster on Docker in minutes.

## 1. Use the official image

```bash
## start the first node
docker run --name node1 -d cassandra

## start the second node and link it to the first
docker run --name node2 -d --link node1:cassandra cassandra
