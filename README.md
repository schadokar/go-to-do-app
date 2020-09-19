# Go To Do App

This a 3 tier **To-Do List** application,  where: 

- Data tier is NoSQL with mongo
- API tier is Golang (exposed to the host on port 8080)
- Frontend tier is React (exposed to the host on port 8081)


# Prerequisites 

Running this app locally require :
- Make (3.81 or later)
- Docker (v19.03 or later)
- Docker Compose (v1.25.5 or later)

**For kubernetes run** you need also : 

- Helm (v3.3.3 or later)
- Helmfile (v0.129.3 or later)
- Local kubernetes cluster (v1.16 or above) - Docker-for-Desktop is recommended

> More Details about [How to setup local k8s cluster with wildcard SSL certificate attached with the ingress](https://github.com/kubernetes-tn/guideline-kubernetes-enterprise/blob/master/general/desktop-env-setup.md)

> `helm -f helmfile.ecosystem.yaml apply` might be useful

# Getting Started

**1. configure it**

- generate .env file `cp .env.example .env`
- populate env vars `export $(cat .env| xargs)`

**2.a. start it with docker-compose** run `docker-compose up -d` or `make up`
then navigate to http://localhost:8081 
or interact directly with API thru localhost:8080 endpoint

ALTERNATIVELY

**2.b. start it with helmfile**

- built images `make`
- Run it on kubernetes `make k8s.up`

then navigate to https://todo.docker.internal
or interact directly with API thru https://todo-api.docker.internal endpoint

> If you don't have ingress in the cluster, we recommend running `make k8s.up.ecosystem` after visiting [helmfile.ecosystem.yaml](helmfile.ecosystem.yaml) file.

# Contribution

Guide for Contribution is [here](./CONTRIBUTING.md).

# Authors 

- Shubham Kumar Chadokar <https://schadokar.dev> - Software Owner & Initiator
- Abdennour Toumi <http://kubernetes.tn> - Adding Cloud-native aspect on the software (docker, helm, kubernetes) 

# License

MIT License

Copyright (c) 2019 Shubham Chadokar
