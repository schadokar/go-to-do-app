# Go To Do App

This a 3 tier **To-Do List** application,  where: 

- Data tier is NoSQL with mongo
- API tier is Golang (exposed to the host on port 8080)
- Frontend tier is React (exposed to the host on port 8081)


# Prerequisites 

Running this app locally require only

**with docker-compose**
- Docker (v19.03 or later)
- Docker Compose (v1.25.5 or later)

**OR with helmfile** adding the following alongside with requirements above:

- Helm (v3.3.3 or later)
- Helmfile (v0.129.3 or later)
- Local kubernetes cluster (v1.16 or above) - Docker-for-Desktop is recommended

> More Details about [How to setup local k8s cluster with wildcard SSL certificate attached with the ingress](https://github.com/kubernetes-tn/guideline-kubernetes-enterprise/blob/master/general/desktop-env-setup.md)

# Getting Started

**1. configure it**

- generate .env file `cp .env.example .env`
- populate env vars `export $(cat .env| xargs)`

**2.a. start it with docker-compose** run `docker-compose up -d`
then navigate to http://localhost:8081 
or interact directly with API thru localhost:8080 endpoint

ALTERNATIVELY

**2.b. start it with helmfile**

- built images `docker-compose build`
- Run it on k8s `helmfile apply`

then navigate to https://todo.docker.internal
or interact directly with API thru https://todo-api.docker.internal endpoint



# Contribution

Guide for Contribution is [here](./CONTRIBUTING.md).

# Authors 

- Shubham Kumar Chadokar <https://schadokar.dev> - Software Owner & Initiator
- Abdennour Toumi <http://kubernetes.tn> - Adding Cloud-native aspect on the software (docker, helm, kubernetes) 

# License

MIT License

Copyright (c) 2019 Shubham Chadokar
