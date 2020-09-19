# Go To Do App

This a 3 tier **To-Do List** application,  where: 

- Data tier is NoSQL with mongo
- API tier is Golang (exposed to the host on port 8080)
- Frontend tier is React (exposed to the host on port 8081)

# Prerequisites 

Running this app locally require only

- Docker (v19.03 or later)
- Docker Compose (v1.25.5 or later)
- Host Ports 8080 and 8081 must not be busy.

# Getting Started

**configure it**

- generate .env file `cp .env.example .env`
- populate env vars `export $(cat .env| xargs)`

**start it** run `docker-compose up -d`
then navigate to http://localhost:8081 
or interact directly with API thru localhost:8080 endpoint

# Contribution

Guide for Contribution is [here](./CONTRIBUTING.md).

# Authors 

- Shubham Kumar Chadokar <https://schadokar.dev> - Software Owner & Initiator
- Abdennour Toumi <http://kubernetes.tn> - Adding Cloud-native aspect on the software (docker, helm, kubernetes) 

# License

MIT License

Copyright (c) 2019 Shubham Chadokar
