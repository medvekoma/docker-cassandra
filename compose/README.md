This folder describes how to use docker-compose for running a Cassandra cluster.

## Starting a cluster

```bash
docker-compose up -d
docker logs
```

## Checking cluster status

```bash
docker ps -a
docker exec -it compose_node1_1 nodetool status
```
  
