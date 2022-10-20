#!/bin/sh
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
sudo docker volume rm rental_pgdata
sudo docker-compose up