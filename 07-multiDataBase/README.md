---- POSTGRES

docker run \
    --name postgres \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=root \
    -e POSTGRES_DB=heroes \
    -p 5432:5432
    -d \
    postgres

docker ps
docker run -it postgres /bin/bash

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

---- MONGODB

docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -d mongo:4

docker run --name mongodbclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

docker exec -it mongodb mongo --host 192.168.99.100 -u admin -p admin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'henrico', pwd: 'zuleika22', roles: [{role: 'readWrite', db: 'herois'}]})"
    