#!/bin/bash

docker build . -t ivanch1ck/node-mongo
docker push ivanch1ck/node-mongo

if [[ "$1" == "run" ]]
then
  docker run -p 8000:3000 ivanch1ck/node-mongo
fi
