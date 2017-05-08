#!/bin/sh

exec docker run --rm -it \
    --name vote-tracker-postgres \
    -p 127.0.0.1:5432:5432 \
    -v "$PWD"/db:/var/lib/postgresql/data \
    postgres:9.6.2
