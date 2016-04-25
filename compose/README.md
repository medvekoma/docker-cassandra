## Starting a cluster with docker-compose

```bash
docker-compose up -d

docker logs
```

## Checking cluster status

```bash
docker ps -a

docker exec -it compose_node1_1 nodetool status
```
  
