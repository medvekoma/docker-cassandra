# docker-cassandra

Step-by-step guide to run a Cassandra cluster on Docker in minutes.

## Use the official image

```Shell
## start the first node
docker run --name node1 -d cassandra

## start the second node and link it to the first
docker run --name node2 -d --link node1:cassandra cassandra

## test cluster formation
docker exec -it node1 nodetool status

## start the third node
docker run --name node3 -d --link node1:cassandra cassandra
```

## Create your own Cassandra image
Visit https://github.com/medvekoma/docker-cassandra/tree/master/image

## Use docker-compose
Visit https://github.com/medvekoma/docker-cassandra/tree/master/compose
