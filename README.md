# Running Cassandra with Docker

This is a step-by-step guide for running a Cassandra cluster with Docker.

## Goal
The goal is to have an automated way for creating, customizing, destroying and recreating a Cassandra cluster, so that we can experiment with adding/removing nodes, changing consistency levels, etc.

![cluster](presentation/cluster.png)
Normally for each node we should
* provision a Linux machine
* install Cassandra on each
* configure Cassandra so that the nodes are aware of each other.

## Docker and its benefits (for us)

Docker is a lightweight virtualization framework.
![docker](presentation/docker-vm-container.png)

From our point of view, docker has two huge benefits:

1. Creating a container is incredibly quick.
1. Docker has a rich public library of ready-to-use container images.

These two properties make docker very suitable for trying out new technologies. Creating a new container from an image usually takes less than a second. This speed advantage of docker is coming from various optimizations:
- Using the host OS' kernel
- Copy-on-write support of the file system

The [docker hub](https://hub.docker.com) is a rich library of public images very similar to
- DEB packages in Debian-based systems
- Maven dependencies in java
- NuGet packages in .NuGet
- NPM packages in node.js

## Demo #1 - Using the Official Cassandra Image

```bash
## start the first node
## docker run - creates a new container from an image
docker run --name node1 -d cassandra
```
- cassandra is the name of the image (it will be downloaded on the first use)
- the name of the container is node1
- the option -d stands for "detached mode"

```bash
## test cluster formation
## docker exec - executes a command in the container
## the option redirects the output to the current console (similar to ssh)
docker exec -it node1 nodetool status
```
You will get an output similar to
```
Datacenter: datacenter1
=======================
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address     Load       Tokens       Owns    Host ID                               Rack
UN  172.20.0.4  80.13 KB   256          ?       0c1cb68a-a84c-4864-af90-fce1214b7e78  rack1
UN  172.20.0.2  105 KB     256          ?       21f00824-b223-455d-99e3-98420d9efa73  rack1
UN  172.20.0.3  94.71 KB   256          ?       f0555f13-27a2-4891-b595-9ccdf46b6c55  rack1
```
The first two characters of each line specify the Status and the current state of the node:
- [U]p or [D]own
- [N]ormal, [L]eaving, [J]oining or [L]eaving


```bash
## start the second node and link it to the first
docker run --name node2 -d --link node1:cassandra cassandra

## start the third node
docker run --name node3 -d --link node1:cassandra cassandra

## display active containers
docker ps

## display all containers
docker ps -a

## stop containers
docker stop container1 container2 container3

## remove containers
docker rm container1 container2 container3
```


## Create your own Cassandra image
Visit https://github.com/medvekoma/docker-cassandra/tree/master/image

## Use docker-compose
Visit https://github.com/medvekoma/docker-cassandra/tree/master/compose
